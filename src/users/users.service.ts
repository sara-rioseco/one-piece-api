import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID, UUID } from 'node:crypto';
import { hash, genSalt } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private readonly rounds: number = parseInt(process.env.SALT_ROUNDS!);
  
  async create(createUserDto: CreateUserDto) {
    const user: User = { id: randomUUID(), ...createUserDto };
    try {
      const salt = await genSalt(this.rounds);
      const hashed = await hash(user.password!, salt);
      user.password = hashed;
      const newUser = this.usersRepository.create(user);
      this.usersRepository.save(newUser);
      delete user.password;
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find();
      const cleanedUsers = structuredClone(users).map((user) => {
        delete user.password;
        return user;
      });
      return cleanedUsers;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(id: UUID) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) throw new NotFoundException('User not found');
      const cleanedUser = structuredClone(user);
      delete cleanedUser.password;
      return cleanedUser;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) throw new NotFoundException('User not found');
      return user
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if (!user) throw new NotFoundException('Character not found');
      const updateResult = await this.usersRepository.update(
        { id },
        updateUserDto,
      );
      if (updateResult.affected! <= 0)
        throw new InternalServerErrorException('Error updating character');
      const updatedChar = await this.findOne(id);
      return updatedChar;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: UUID) {
    try {
      const user = await this.findOne(id);
      if (!user) throw new NotFoundException('Character not found');
      const deleteResult = await this.usersRepository.delete({
        id: user.id,
      });
      if (deleteResult.affected! <= 0)
        throw new InternalServerErrorException('Error deleting character');
      return { message: 'User deleted successfully' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}

import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID, UUID } from 'node:crypto';
import { hash, genSalt } from 'bcrypt';
import { CreateUserDto, PartialUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private readonly rounds: number = parseInt(process.env.SALT_ROUNDS!);
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user: User = { id: randomUUID(), ...createUserDto };
      const salt = await genSalt(this.rounds);
      const hashed = await hash(user.password!, salt);
      user.password = hashed;
      const newUser = this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
      this.logger.log('User successfully created');
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  async findAll(search?: string) {
    let users: User[];
    try {
      if (search) {
        const filters = {
          where: [
            { name: Like(`%${search}%`) },
            { surname: Like(`%${search}%`) },
            { email: Like(`%${search}%`) },
          ],
        };
        users = await this.usersRepository.find(filters);
      } else {
        users = await this.usersRepository.find();
      }
      this.logger.log('Returned all users found');
      return users;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: UUID) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');
      this.logger.log('Returned user found');
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (err) {
      throw err;
    }
  }

  async update(id: UUID, updateUserDto: UpdateUserDto, user: PartialUserDto) {
    if (user.role !== 'admin' && user.id !== id) {
      throw new ForbiddenException(
        'Forbidden resource, users can only update their own information',
      );
    }
    try {
      const user = await this.findOne(id);
      if (!user) throw new NotFoundException('Character not found');
      const updatedUser= this.usersRepository.merge({ ...user, ...updateUserDto });
      this.logger.log('User successfully updated.');
      this.logger.debug(updateUserDto)
      return this.usersRepository.save(updatedUser);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: UUID) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) throw new NotFoundException('User not found');
      const res = await this.usersRepository.softDelete(id);
      const isUserDeleted = res.affected! > 0;
      const message = isUserDeleted
        ? 'User successfully deleted'
        : 'Error deleting user';
      if (!isUserDeleted) throw new InternalServerErrorException(message);
      this.logger.log(message);
      return { message };
    } catch (err) {
      throw err;
    }
  }
}

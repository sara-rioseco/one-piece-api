import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID, UUID } from 'node:crypto';
import { hash, genSalt } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';

const users: User[] = [];

@Injectable()
export class UsersService {
  private readonly rounds: number = parseInt(process.env.SALT_ROUNDS!);

  async create(createUserDto: CreateUserDto) {
    const user: User = { id: randomUUID(), ...createUserDto };
    try {
      const salt = await genSalt(this.rounds);
      const hashed = await hash(user.password!, salt);
      user.password = hashed;
      users.push(user);
      delete user.password;
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  findAll() {
    const resultUsers = structuredClone(users);
    return resultUsers.map((u) => {
      delete u.password;
      return u;
    });
  }

  findOne(id: UUID) {
    const found = users.filter((u) => u.id === id);
    if (found.length < 1) throw new NotFoundException('User not found');
    const user = structuredClone(found[0]);
    delete user.password;
    return user;
  }

  findByEmail(email: string) {
    const found = users.filter((u) => u.email === email);
    if (found.length < 1) throw new NotFoundException('User not found');
    return found[0];
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex < 0) throw new NotFoundException('User not found');
    if (
      !updateUserDto ||
      (!updateUserDto.name &&
        !updateUserDto.surname &&
        !updateUserDto.email &&
        !updateUserDto.password &&
        !updateUserDto.role)
    ) {
      throw new BadRequestException('At least one user field must be provided');
    }
    if (Object.keys(updateUserDto).includes('password')) {
      try {
        const salt = await genSalt(this.rounds);
        const hashed = await hash(updateUserDto.password!, salt);
        updateUserDto.password = hashed;
        const user = { ...users[userIndex], ...updateUserDto };
        users.splice(userIndex, 1, user);
        delete user.password;
        return user;
      } catch (err) {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  remove(id: UUID) {
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex < 0) throw new NotFoundException('User not found');
    users.splice(userIndex, 1);
    return 'User deleted successfully';
  }
}

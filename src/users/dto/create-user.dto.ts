import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsEnum,
} from 'class-validator';
import { Role } from '../entities';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsEnum(Role, { groups: [Role.ADMIN, Role.USER] })
  @IsNotEmpty()
  role: Role;
}

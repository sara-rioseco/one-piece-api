import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Role } from '../entities';
import { IsUnique } from 'src/auth/decorators';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  // @IsUnique({tableName: 'User', column: 'email'})
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsEnum(Role, { groups: [Role.ADMIN, Role.USER] })
  role: Role;
}

export class NewPasswordDto {
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  newPassword: string;
}

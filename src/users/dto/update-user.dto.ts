import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'country', 'role']),
) {}

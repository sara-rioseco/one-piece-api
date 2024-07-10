import { IsNotEmpty, IsString } from 'class-validator';

export class Origin {
  @IsNotEmpty()
  @IsString()
  sea: string;
  @IsNotEmpty()
  @IsString()
  island: string;
  @IsNotEmpty()
  @IsString()
  country: string;
}

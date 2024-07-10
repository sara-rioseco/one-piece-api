import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class Residence {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsBoolean() 
  active: boolean
}
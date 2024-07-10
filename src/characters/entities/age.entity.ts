import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class Age {
  @IsNotEmpty()
  @IsPositive()
  yrs: number;
  @IsNotEmpty()
  @IsString()
  when: string;
}
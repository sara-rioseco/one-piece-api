import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class Height {
  @IsNotEmpty()
  @IsPositive()
  cm: number;
  @IsNotEmpty()
  @IsString()
  when: string;
}
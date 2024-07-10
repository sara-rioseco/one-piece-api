import { IsNotEmpty, IsNumber } from "class-validator";

export class Debut {
  @IsNotEmpty()
  @IsNumber()
  chapter: number;
  @IsNotEmpty()
  @IsNumber()
  episode: number;
}
import { IsNotEmpty, IsString } from "class-validator";

export class Epiteth {
  @IsNotEmpty()
  @IsString()
  en: string;
  @IsNotEmpty()
  @IsString()
  jp: string;
  @IsNotEmpty()
  @IsString()
  romaji: string;
}
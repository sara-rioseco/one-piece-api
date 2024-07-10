import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class DevilFruit {
  @IsNotEmpty()
  @IsString()
  en: string;
  @IsNotEmpty()
  @IsString()
  jp: string;
  @IsNotEmpty()
  @IsString()
  romaji: string;
  @IsNotEmpty()
  @IsString()
  meaning: string;
  @IsNotEmpty()
  @IsString()
  type: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  subtype?: string;
}
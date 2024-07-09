import { IsString, IsNumber, IsNotEmpty, IsDateString, IsObject, IsNotEmptyObject, ValidateNested, IsPositive, IsArray } from 'class-validator';
import { Status } from '../entities/status.enum';

class Debut {
  @IsNotEmpty()
  @IsNumber()
  chapter: number;
  @IsNotEmpty()
  @IsNumber()
  episode: number;
}

export class CreateCharacterDto {
  @IsNotEmpty()
  @IsString()
  en_name: string;
  @IsNotEmpty()
  @IsString()
  jp_name: string;
  @IsNotEmpty()
  @IsString()
  romaji_name: string;
  @IsNotEmptyObject()
  @ValidateNested()
  debut: Debut;
  @IsNotEmpty()
  @IsArray({each: true})
  affiliations: string[];
  @IsNotEmpty()
  @IsArray({each: true})
  occupations: string[];
  origin: { 
    sea: string; 
    island: string; 
    country: string };
  residence: { 
    name: string, 
    active: boolean
  }[];
  @IsNotEmpty()
  @IsArray({each: true})
  alias: string[];
  epiteth: {
    en: string;
    jp: string;
    romaji: string;
  }[];
  status: Status;
  age: {
    yrs: number;
    when: string;
  }[];
  birthday: string;
  height: {
    cm: number;
    when: string;
  }[];
  blood_type: string;
  bounty: { 
    amt: number;
    active: boolean;
  }[];
  devil_fruit: {
    en: string;
    jp: string;
    romaji: string;
    meaning: string;
    type: string;
    subtype?: string;
  }[];
}

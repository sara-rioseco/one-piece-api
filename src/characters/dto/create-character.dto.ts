import { IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCharacterDto {
  en_name: string;
  jp_name: string;
  romaji_name: string;
  debut: {
    chapter: number;
    episode: number;
  };
  affiliations: string[];
  occupations: string[];
  origin: { 
    sea: string; 
    island: string; 
    country: string };
  residence: { 
    name: string, 
    active: boolean}[];
  alias: string[];
  epiteth: {
    en: string;
    jp: string;
    romaji: string;
  }[];
  status: 'alive' | 'dead' | 'unknown';
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

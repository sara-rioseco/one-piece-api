export class CreateCharacterDto {
  name: string;
  jp_name: string;
  jp_romaji_name: string;
  debut: {
    chapter: number;
    episode: number;
  };
  affiliations: string[];
  occupations: string[];
  origin: string;
  residence: string[];
  alias: string;
  epiteth: string[];
  status: 'alive' | 'dead' | 'unknown';
  age: number;
  birthday: Date;
  height: number;
  blood_type: string;
  bounty: number;
  devil_fruit: {
    en_name: string;
    jp_name: string;
    meaning: string;
    type: string;
    subtype?: string;
  }[]

}

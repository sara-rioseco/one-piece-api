import { IsString, IsNumber, IsNotEmpty, IsDateString, IsNotEmptyObject, IsEnum, IsObject, ValidateNested, IsArray } from 'class-validator';
import { Age, Bounty, Debut, DevilFruit, Epiteth, Height, Origin, Residence, Status,  } from '../entities';
import { Type } from 'class-transformer';

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
  @ValidateNested({each: true})
  @Type(()=> Debut)
  debut: Debut;

  @IsString({each: true})
  affiliations: string[];

  @IsString({each: true})
  occupations: string[];

  @IsNotEmptyObject()
  @ValidateNested({each: true})
  @Type(()=> Origin)
  origin: Origin;

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Residence)
  residence: Residence[]; // HERE

  @IsString({each: true})
  alias: string[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Epiteth)
  epiteth: Epiteth[];  // HERE

  @IsEnum(Status, {groups: ['alive', 'dead', 'unknown']})
  status: Status;

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Age)
  age: Age[];  // HERE

  @IsNotEmpty()
  @IsDateString()
  birthday: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Height)
  height: Height[]; // HERE

  @IsNotEmpty()
  @IsString()
  blood_type: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Bounty,)
  bounty: Bounty[]; // HERE
  
  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> DevilFruit)
  devil_fruit: DevilFruit[]; // HERE
}

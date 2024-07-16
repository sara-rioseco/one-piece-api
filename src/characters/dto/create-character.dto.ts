import { IsString, IsNumber, IsNotEmpty, IsDateString, IsNotEmptyObject, IsEnum, IsObject, ValidateNested, IsArray, IsOptional, IsDate } from 'class-validator';
import { Affiliation, Age, Alias, Bounty, Debut, DevilFruit, Epiteth, Height, Occupation, Origin, Residence, Status,  } from '../entities';
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

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Affiliation)
  affiliations: Affiliation[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Occupation)
  occupations: Occupation[];

  @IsNotEmptyObject()
  @ValidateNested({each: true})
  @Type(()=> Origin)
  origin: Origin;

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Residence)
  residences: Residence[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Alias)
  alias: Alias[];

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Epiteth)
  epiteths: Epiteth[];  // HERE

  @IsEnum(Status, {groups: ['alive', 'dead', 'unknown']})
  status: Status;

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Age)
  ages: Age[];  // HERE

  @IsNotEmpty()
  @IsDateString()
  birthday: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Height)
  heights: Height[]; // HERE

  @IsNotEmpty()
  @IsString()
  bloodType: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> Bounty,)
  bounties: Bounty[];
  
  @IsArray()
  @ValidateNested({each: true})
  @Type(()=> DevilFruit)
  devilFruits: DevilFruit[];

  @IsDate()
  @IsOptional()
  createdDate: Date;

  @IsDate()
  @IsOptional()
  lastUpdatedDate: Date;
}

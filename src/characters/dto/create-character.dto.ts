import { IsString, IsNumber, IsNotEmpty, IsDateString, IsNotEmptyObject, IsEnum, IsObject } from 'class-validator';
import { Age, Bounty, Debut, DevilFruit, Epiteth, Height, Origin, Residence, Status,  } from '../entities';

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
  debut: Debut;

  @IsNotEmpty()
  @IsString({each: true})
  affiliations: string[];

  @IsNotEmpty()
  @IsString({each: true})
  occupations: string[];

  @IsNotEmptyObject()
  origin: Origin;

  @IsNotEmpty()
  @IsObject({each: true})
  residence: Residence[];

  @IsNotEmpty()
  @IsString({each: true})
  alias: string[];

  @IsNotEmpty()
  @IsObject({each: true})
  epiteth: Epiteth[];

  @IsNotEmpty()
  @IsEnum(Status, {groups: ['alive', 'dead', 'unknown']})
  status: Status;

  @IsNotEmpty()
  @IsObject({each: true})
  age: Age[];

  @IsNotEmpty()
  @IsDateString()
  birthday: string;

  @IsNotEmpty()
  @IsObject({each: true})
  height: Height[];

  @IsNotEmpty()
  @IsString()
  blood_type: string;

  @IsNotEmpty()
  @IsObject({each: true})
  bounty: Bounty[];
  
  @IsNotEmpty()
  @IsObject({each: true})
  devil_fruit: DevilFruit[];
}

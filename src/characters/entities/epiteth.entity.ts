import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";
import { UUID } from "crypto";

@Entity()
export class Epiteth {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  en: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  jp: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  romaji: string;

  @Column({ nullable: true })
  char_id: UUID;

  @ManyToOne(() => Character, character => character.epiteths)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}
import { IsNotEmpty, IsString, IsOptional, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";

@Entity()
export class DevilFruit {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  fruit_id: string;

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

  @Column()
  @IsNotEmpty()
  @IsString()
  meaning: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  type: string;

  @Column({default: ''})
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  subtype?: string;

  @Column({ nullable: true })
  char_id: UUID;

  @ManyToOne(() => Character, character => character.devilFruits)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}
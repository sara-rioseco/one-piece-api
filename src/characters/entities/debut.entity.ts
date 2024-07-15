import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";
import { UUID } from "crypto";

@Entity()
export class Debut {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  id: string;
  
  @Column()
  @IsNotEmpty()
  @IsNumber()
  chapter: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  episode: number;

  @Column({ nullable: true })
  char_id: UUID;

  @OneToOne(()=> Character, character => character.debut)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}
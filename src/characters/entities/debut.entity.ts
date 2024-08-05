import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";
import { UUID } from "crypto";
import { Exclude } from "class-transformer";

@Entity()
export class Debut {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @Exclude()
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
  @Exclude()
  char_id: UUID;

  @OneToOne(()=> Character, character => character.debut)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}
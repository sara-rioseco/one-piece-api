import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";
import { UUID } from "node:crypto";
import { Exclude } from "class-transformer";

@Entity()
export class Occupation {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @Exclude()
  id: string;
  
  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @Exclude()
  char_id: UUID;

  @ManyToOne(() => Character, character => character.occupations)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}
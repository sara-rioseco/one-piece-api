import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";
import { UUID } from "node:crypto";

@Entity()
export class Residence {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  id: string;
  
  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsBoolean() 
  active: boolean

  @Column({ nullable: true })
  char_id: UUID;

  @ManyToOne(() => Character, character => character.residences)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}
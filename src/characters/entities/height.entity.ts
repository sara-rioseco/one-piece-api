import { IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from './character.entity';
import { UUID } from "node:crypto";

@Entity()
export class Height {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  id: string;
  
  @Column()
  @IsNotEmpty()
  @IsPositive()
  cm: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  when: string;

  @Column({ nullable: true })
  char_id: UUID;

  @ManyToOne(()=>Character, character => character.heights)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}
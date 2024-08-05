import { IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from './character.entity';
import { UUID } from "node:crypto";
import { Exclude } from "class-transformer";

@Entity()
export class Height {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @Exclude()
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
  @Exclude()
  char_id: UUID;

  @ManyToOne(()=>Character, character => character.heights)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}
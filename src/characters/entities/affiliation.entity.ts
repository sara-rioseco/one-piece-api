import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Character } from './character.entity';
import { UUID } from 'node:crypto';

@Entity()
export class Affiliation {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  char_id: UUID;

  @ManyToOne(() => Character, (character) => character.affiliations)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}

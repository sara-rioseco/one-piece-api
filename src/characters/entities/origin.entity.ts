import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './character.entity';
import { UUID } from 'node:crypto';

@Entity()
export class Origin {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  id: string;
  
  @Column()
  @IsNotEmpty()
  @IsString()
  sea: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  island: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  country: string;

  @Column({ nullable: true })
  char_id: UUID;

  @OneToOne(()=> Character, character => character.origin)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}

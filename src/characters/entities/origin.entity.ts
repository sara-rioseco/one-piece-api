import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './character.entity';
import { UUID } from 'node:crypto';
import { Exclude } from 'class-transformer';

@Entity()
export class Origin {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @Exclude()
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
  @Exclude()
  char_id: UUID;

  @OneToOne(()=> Character, character => character.origin)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}

import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { Character } from "./character.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "node:crypto";

@Entity()
export class Age {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  id: string;
  
  @Column()
  @IsNotEmpty()
  @IsPositive()
  yrs: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  when: string;

  @Column({ nullable: true })
  char_id: UUID;

  @ManyToOne(() => Character, character => character.ages)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}
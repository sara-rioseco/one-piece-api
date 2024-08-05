import { IsBoolean, IsNotEmpty, IsOptional, IsPositive, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./character.entity";
import { UUID } from "node:crypto";
import { Exclude } from "class-transformer";

@Entity()
export class Bounty {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @Exclude()
  id: string;

  @Column({type: "bigint"})
  @IsNotEmpty()
  @IsPositive()
  amt: number;

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @Column({ nullable: true })
  @Exclude()
  char_id: UUID;

  @ManyToOne(()=> Character, character => character.bounties)
  @JoinColumn({ name: 'char_id' })
  character: Character;
}
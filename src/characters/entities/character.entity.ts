import { UUID } from 'crypto';
import { Status } from './status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Affiliation,
  Age,
  Alias,
  Bounty,
  Debut,
  DevilFruit,
  Epiteth,
  Height,
  Occupation,
  Origin,
  Residence
} from './index';

@Entity()
export class Character {
  @PrimaryGeneratedColumn('uuid')
  char_id: UUID;

  @Column()
  en_name: string;

  @Column()
  jp_name: string;

  @Column()
  romaji_name: string;

  @OneToOne(() => Debut, (debut) => debut.character, {
    cascade: true,
  })
  debut: Debut;

  @OneToMany(() => Affiliation, (affiliation) => affiliation.character, {
    cascade: true,
  })
  affiliations: Affiliation[];

  @OneToMany(() => Occupation, (occupation) => occupation.character, {
    cascade: true,
  })
  occupations: Occupation[];

  @OneToOne(() => Origin, (origin) => origin.character, {
    cascade: true,
  })
  origin: Origin;

  @OneToMany(() => Residence, (residence) => residence.character, {
    cascade: true,
  })
  residences: Residence[];

  @OneToMany(() => Alias, (alias) => alias.character, {
    cascade: true,
  })
  alias: Alias[];

  @OneToMany(() => Epiteth, (epiteth) => epiteth.character, {
    cascade: true,
  })
  epiteths: Epiteth[];

  @Column({
    type: "enum",
    enum: Status,
    default: Status.ALIVE
})
  status: Status;

  @OneToMany(() => Age, (age) => age.character, {
    cascade: true,
  })
  ages: Age[];

  @Column()
  birthday: Date;

  @OneToMany(() => Height, (height) => height.character, {
    cascade: true,
  })
  heights: Height[];

  @Column()
  bloodType: string;

  @OneToMany(() => Bounty, (bounty) => bounty.character, {
    cascade: true,
  })
  bounties: Bounty[];

  @OneToMany(() => DevilFruit, (devilFruit) => devilFruit.character, {
    cascade: true,
  })
  devilFruits: DevilFruit[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  lastUpdatedDate: Date;
}

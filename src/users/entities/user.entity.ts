import { UUID } from 'crypto';
import { Role } from './role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER
  })
  role: Role;

  @CreateDateColumn()
  createdDate?: Date;

  @UpdateDateColumn()
  lastUpdatedDate?: Date;
}

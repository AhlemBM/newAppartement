import bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Index,
  OneToMany,
  ManyToOne,
  ManyToMany,
  OneToOne,
  JoinColumn,
  IntegerType,
} from 'typeorm';

import { Role, Language, Provider } from './types';
import { UserEntity } from './user.entity';
import { Address } from 'cluster';
import { ChekinEntity } from './checkin.entity';


@Entity('appartements')
export class AppartementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
  })
  name: string;

  @Column({

  })
  addresse: string;

  @Column({

  })
  frais_menage: number;

  @Column({
    default: 0,
  })
  status: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.appartements)
  user: UserEntity;

  @OneToMany(() => ChekinEntity, (checkin) => checkin.appartement)
  checkins?: ChekinEntity[];



  toJSON() {
    return {
      ...this,
    };
  }
}

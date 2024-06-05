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
import { AppartementEntity } from './appartement.entity';

@Entity('checkins')
export class ChekinEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
  })
  nom_client: string;

  @Column({
    default: 0,
  })
  commission: Number;


  @Column({
    type: 'date',
    default: null,
  })
  date_debut: Date;

  @Column({
    default: null,
  })
  nombre_nuits: number;

  @Column({
    default: 0,
  })
  prix_total: number;

@Column({
    default: 0,
  })
  prix_nuit: number;



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

  @ManyToOne(() => UserEntity, (user) => user.checkins)
  user: UserEntity;

  @ManyToOne(() => AppartementEntity, (appartement) => appartement.checkins)
  appartement: AppartementEntity;

  toJSON() {
    return {
      ...this,
    };
  }
}

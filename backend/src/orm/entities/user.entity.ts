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
} from 'typeorm';


import { Role, Language, Provider } from './types';

import { ChekinEntity } from './checkin.entity';
import { AppartementEntity } from './appartement.entity';


@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('users-email-idx')
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    default: 'EMAIL' as Provider,
  })
  provider: string;

  @Column({
    default: 'SIMPLE' as Role,
    length: 30,
  })
  role: string;
  @Index('user-socialId-idx')
  @Column({ type: String, nullable: true })
  socialId: string | null;

  @Column({
    nullable: true,
  })
  token: string;

  @Column({
    default: 0,
  })
  status: number;


  @Column({
    default: 'fr-FR' as Language,
    length: 15,
  })
  language: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;


  @OneToMany(() => ChekinEntity, (checkin) => checkin.user)
  checkins?: ChekinEntity[];

  @OneToMany(() => AppartementEntity, (appartement) => appartement.user)
  appartements?: AppartementEntity[];



  setLanguage(language: Language) {
    this.language = language;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
      verified: undefined,
      firstName: undefined,
      lastName: undefined,
      fullName: this.firstName + ' ' + this.lastName,
      verificationCode: undefined,
    };
  }
}

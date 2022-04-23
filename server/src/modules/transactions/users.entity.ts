import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
} from 'typeorm';
import * as crypto from 'crypto';

const PrevPasswordSymbol = Symbol('UserPrevPassword');
const PrevEmailSymbol = Symbol('UserPrevEmail');
const PasswordPlaceholder = '***********';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '80' })
  username: string;

  @Column({ type: 'varchar', length: '80' })
  email: string;

  @Column({ type: 'varchar', length: '64', select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  // @Column({ default: false })
  // isPasswordChange: boolean;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dtCreate: Date;
}

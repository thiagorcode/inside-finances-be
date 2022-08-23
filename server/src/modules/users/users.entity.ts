import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ type: 'varchar', length: '64' })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  // @Column({ default: false })
  // isPasswordChange: boolean;

  @CreateDateColumn()
  dtCreate: Date;

  @UpdateDateColumn()
  dtUpdate: Date;

  @AfterLoad()
  loadPassword() {
    this[PrevEmailSymbol] = this.email;
    this[PrevPasswordSymbol] = this.password;
    this.password = PasswordPlaceholder;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password === PasswordPlaceholder) {
      this.password = this[PrevPasswordSymbol];
    }

    if (this.password && this.password.length !== 64) {
      this.password = crypto
        .createHash('sha256')
        .update(`${this.username}_${this.password}`)
        .digest('hex');
    }

    if (
      this.password !== this[PrevPasswordSymbol] ||
      this.email !== this[PrevEmailSymbol]
    ) {
      this[PrevPasswordSymbol] = this.password;
      this[PrevEmailSymbol] = this.email;
    }
  }

  get unmaskedPassword() {
    return this.password === PasswordPlaceholder
      ? this[PrevPasswordSymbol]
      : this.password;
  }
}

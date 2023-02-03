import { TypeEnum } from './../../../enums/type.enum';
import { Injectable } from '@nestjs/common';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { TransactionsCategory } from '../../transactionsCategory/entities/transactionsCategory.entity';

@Injectable()
@Entity({ database: 'gen', name: 'transactions' })
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '80' })
  description: string;

  @Column({ type: 'float', precision: 2, nullable: false })
  value: number;

  @Column({ type: 'bool', default: true, nullable: false })
  isPaid: boolean;

  @Column({ type: 'int', nullable: false, default: 0 })
  year: number;

  @Column({ type: 'varchar', nullable: false })
  yearMonth: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'enum', enum: TypeEnum, nullable: false })
  type: TypeEnum;

  @Column({ type: 'varchar', default: '' })
  specification?: string;

  @Column({ type: 'varchar', default: '' })
  bank?: string;

  @Column({ type: 'varchar', default: 'web' })
  originCreate?: string;

  @Column({ type: 'int', default: 0 })
  installment?: number;

  @Column({ type: 'int', default: 0 })
  finalInstallment?: number;

  @Column({ type: 'varchar', nullable: false })
  userId: string;

  @Column({ type: 'varchar', nullable: false })
  categoryId: string;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @ManyToOne(() => TransactionsCategory)
  @JoinColumn({ name: 'categoryId' })
  category: TransactionsCategory;

  @CreateDateColumn()
  dtCreated: Date;

  @UpdateDateColumn()
  dtUpdated: Date;

  @BeforeInsert()
  @BeforeUpdate()
  formatDate() {
    this.date = new Date(this.date);
    this.year = this.date.getFullYear();
    this.yearMonth = `${this.date.getFullYear()}-${(this.date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;
  }
}

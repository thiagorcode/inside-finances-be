import { Injectable } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Injectable()
@Entity({ database: 'das', name: 'summary_transactions_month' })
@Unique(['year', 'yearMonth', 'userId'])
export class SummaryTransactionMonth {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  recipeValue: number;

  @Column()
  expenseValue: number;

  @Column()
  total: number;

  @Column()
  year: number;

  @Column()
  yearMonth: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  dtCreated: Date;

  @UpdateDateColumn()
  dtUpdated: Date;
}

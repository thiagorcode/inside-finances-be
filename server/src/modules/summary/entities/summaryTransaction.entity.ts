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
@Entity({ database: 'das', name: 'summary_transactions_day' })
@Unique(['year', 'yearMonth', 'type', 'userId'])
export class SummaryTransactions {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  value: number;

  @Column()
  year: number;

  @Column()
  yearMonth: string;

  @Column()
  type: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  dtCreated: Date;

  @UpdateDateColumn()
  dtUpdated: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ database: 'das', name: 'summary_transactions_month' })
@Unique(['year', 'yearMonth', 'type', 'userId'])
export class SummaryTransactionMonth {
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

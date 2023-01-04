import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Transactions } from '../../transactions/entities/transactions.entity';

@Entity()
export class TransactionsCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Criar tabela para o category
  @Column({ type: 'varchar', length: '80' })
  name: string;

  @Column({ type: 'varchar' })
  type: '+' | '-';

  @ManyToOne(() => Transactions, (transaction) => transaction.category)
  transactions: Transactions;

  @CreateDateColumn()
  dtCreate: Date;

  @UpdateDateColumn()
  dtUpdate: Date;
}

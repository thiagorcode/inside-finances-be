import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Transactions } from '../../transactions/entities/transactions.entity';

@Entity({ name: 'transactions_category' })
export class TransactionsCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Criar tabela para o category
  @Column({ type: 'varchar', length: '80' })
  name: string;

  @Column({ type: 'varchar', length: '3' })
  type: '+' | '-';

  @Column({ type: 'varchar', length: '50', default: '' })
  icon: string;

  @ManyToOne(() => Transactions)
  @JoinColumn()
  transactions: Transactions;

  @CreateDateColumn()
  dtCreate: Date;

  @UpdateDateColumn()
  dtUpdate: Date;
}

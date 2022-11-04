import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TransactionsCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Criar tabela para o category
  @Column({ type: 'varchar', length: '80' })
  name: string;

  @Column({ type: 'varchar', length: '3' })
  type: '+' | '-';

  @Column({ type: 'varchar', length: '50' })
  icon: string;
  // @ManyToOne(() => Transactions)
  // @JoinColumn()
  // transactions: Transactions;
  @CreateDateColumn()
  dtCreate: Date;

  @UpdateDateColumn()
  dtUpdate: Date;
}

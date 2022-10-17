import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TransactionsCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Criar tabela para o category
  @Column({ type: 'varchar', length: '80' })
  name: string;

  @Column({ type: 'varchar' })
  type: '+' | '-';

  // @ManyToOne(() => Transactions)
  // @JoinColumn()
  // transactions: Transactions;

  @CreateDateColumn()
  dtCreate: Date;

  @UpdateDateColumn()
  dtUpdate: Date;
}

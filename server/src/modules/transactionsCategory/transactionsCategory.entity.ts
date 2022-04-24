import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class TransactionsCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Criar tabela para o category
  @Column({ type: 'varchar', length: '80' })
  category: string;

  @Column({ type: 'varchar', length: '80' })
  description: string;

  @Column({ type: 'float', precision: 2 })
  value: number;

  @Column({ type: 'bool', default: true })
  isPaid: boolean;

  @Column({ type: 'int' })
  year: number;

  // @Column({ type: 'int' })
  // month: number;

  // @Column({ type: 'int' })
  // day: number;

  @Column({ type: 'varchar' })
  yearMonth: string;

  @Column({ type: 'varchar' })
  yearMonthDay: string;

  @Column({ type: 'varchar' })
  type: '+' | '-';

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @Column({ type: 'varchar', default: 'web' })
  originCreate?: 'web' | 'telegram';

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dtCreate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  formatDate() {
    const schemaDate = this.yearMonthDay.split('-');

    this.yearMonth = `${schemaDate[0]}-${schemaDate[1]}`;
    this.year = +schemaDate[0];
  }
}

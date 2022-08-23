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
} from 'typeorm';
import { Users } from '../users/users.entity';
import { TransactionsCategory } from '../transactionsCategory/transactionsCategory.entity';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  // converter para date
  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar' })
  type: '+' | '-';

  @Column({ type: 'varchar', default: '' })
  specification?: string;

  @Column({ type: 'varchar', default: '' })
  bank?: string;

  @Column({ type: 'varchar', default: 'web' })
  originCreate?: 'web' | 'telegram';

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  categoryId: string;

  @ManyToOne(() => Users)
  @JoinColumn()
  user: Users;

  @ManyToOne(() => TransactionsCategory)
  @JoinColumn({ name: 'categoryId' })
  category: TransactionsCategory;

  @CreateDateColumn()
  dtCreate: Date;

  @UpdateDateColumn()
  dtUpdate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  formatDate() {
    this.date = new Date(this.date);
    this.yearMonth = `${this.date.getFullYear()}-${
      this.date.getMonth() <= 9
        ? `0${this.date.getMonth() + 1}`
        : this.date.getMonth() + 1
    }`;
    this.year = +this.date.getFullYear();
  }
}

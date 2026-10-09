import { TypeEnum } from './../../../enums/type.enum';
import { Injectable } from '@nestjs/common';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Injectable()
@Entity({ name: 'transactions_category', database: 'gen' })
export class TransactionsCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '80' })
  name: string;

  @Column({ type: 'enum', enum: TypeEnum })
  type: TypeEnum;

  @Column({ type: 'varchar', length: '50', default: '' })
  icon: string;

  @CreateDateColumn()
  dtCreated: Date;

  @UpdateDateColumn()
  dtUpdated: Date;
}

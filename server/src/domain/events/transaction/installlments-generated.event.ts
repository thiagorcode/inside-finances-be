import {
  TypeExpenseEnum,
  TypeTransactionEnum,
} from 'src/domain/entities/transaction.entity';
import { UniqueEntityID } from '../../common/unique-entity-id';

export class InstallmentsGeneratedEvent {
  constructor(
    public readonly transactionId: UniqueEntityID,
    public readonly payload: {
      value: number;
      date: Date;
      finalInstallment: number;
      currentInstallment: number;
      category: string;
      card?: string;
      description: string;
      type: TypeTransactionEnum;
      expenseType: TypeExpenseEnum;
    },
  ) {}
}

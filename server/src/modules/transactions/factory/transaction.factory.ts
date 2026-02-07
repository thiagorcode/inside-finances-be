import {
  Transaction,
  TYPE_EXPENSE,
  TYPE_TRANSACTION,
} from 'src/domain/entities/transaction.entity';
import { CreateTransactionsDTO } from '../dtos/createTransactions.dto';

export class TransactionFactory {
  static create(data: CreateTransactionsDTO) {
    return Transaction.create({
      currentInstallment: 0,
      finalInstallment: 0,
      originCreate: 'app',
      isInstallment: false,
      value: data.value,
      description: data.description,
      date: new Date(data.date),
      isPaid: data.isPaid,
      type: TYPE_TRANSACTION.RECIPE,
      expenseType: TYPE_EXPENSE.LOSE,
      year: '2026',
      monthYear: '02-2026',
      category: data.categoryId,
      card: 'test-id',
    });
  }
}

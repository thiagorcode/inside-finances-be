import {
  Transaction,
  TypeExpenseEnum,
  TypeTransactionEnum,
} from '../../../domain/entities/transaction.entity';
import { TypeEnum } from '../../../enums/type.enum';
import { CreateTransactionsDTO } from '../dtos/createTransactions.dto';

export class TransactionFactory {
  // Converte o type recebido pela API ('+'/'-') para o type do domínio
  static toTransactionType(type: TypeEnum): TypeTransactionEnum {
    return type === TypeEnum.Recipe
      ? TypeTransactionEnum.RECIPE
      : TypeTransactionEnum.EXPENSE;
  }

  static create(data: CreateTransactionsDTO) {
    const currentInstallment = data.installment ?? (data.finalInstallment ? 1 : 0);
    const finalInstallment = data.finalInstallment ?? 0;

    return Transaction.create({
      userId: data.userId,
      value: data.value,
      type: TransactionFactory.toTransactionType(data.type),
      category: data.categoryId,
      // TODO: evoluir para a entidade TransactionCard quando ela existir
      card: data.bank,
      description: data.description,
      date: new Date(data.date),
      isPaid: data.isPaid,
      // TODO: adicionar o campo no DTO até a unificação dos enums de type
      expenseType: TypeExpenseEnum.LOSS,
      originCreate: data.originCreate ?? 'app',
      isInstallment: finalInstallment > 1,
      currentInstallment,
      finalInstallment,
    });
  }
}

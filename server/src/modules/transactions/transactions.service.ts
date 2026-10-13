import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionsDTO } from './dtos/createTransactions.dto';
import { FindAllWithQueryDto } from './dtos/findAllWithQuery.dto';
import { Totalizers } from './interface/totalizers.interface';
import { UpdateTransactionsDTO } from './dtos/updateTransactions.dto';
import {
  Transaction,
  TransactionProps,
  TypeTransactionEnum,
} from '../../domain/entities/transaction.entity';
import { TransactionFactory } from './factory/transaction.factory';
import { EventBus } from '@nestjs/cqrs';
import { TypeEnum } from '../../enums/type.enum';

@Injectable()
export class TransactionsService {
  // TODO: substituir por repositório DDD (TypeORM) quando a migração for concluída
  private readonly repository: Transaction[] = [];

  constructor(private readonly eventBus: EventBus) {}

  findAllTransactionByUser(userId: string): Transaction[] {
    return this.repository.filter((item) => item.userId === userId);
  }

  findAllWithQuery({
    userId,
    categoryId,
    date,
    type,
    isPaid,
  }: FindAllWithQueryDto): Transaction[] {
    const transactionType = type
      ? TransactionFactory.toTransactionType(type as TypeEnum)
      : undefined;

    return this.repository.filter((transaction) => {
      if (transaction.userId !== userId) return false;
      if (categoryId && transaction.category !== categoryId) return false;
      if (date && transaction.yearMonth !== date) return false;
      if (transactionType && transaction.type !== transactionType) {
        return false;
      }
      if (typeof isPaid === 'boolean' && transaction.isPaid !== isPaid) {
        return false;
      }
      return true;
    });
  }

  findTotalizersValue(transactions: Transaction[]) {
    const recipe = transactions
      .filter((transaction) => transaction.type === TypeTransactionEnum.RECIPE)
      .reduce((acc, curr) => acc + curr.value, 0);

    const expense = transactions
      .filter((transaction) => transaction.type === TypeTransactionEnum.EXPENSE)
      .reduce((acc, curr) => acc + curr.value, 0);

    const totalBalance = recipe - expense;

    const totalizers: Totalizers = {
      recipe,
      expense,
      totalBalance,
    };
    return totalizers;
  }

  findLastByUser(userId: string): Transaction[] {
    return this.repository
      .filter(
        (item) => item.userId === userId && item.isPaid === true,
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);
  }

  find(id: string): Transaction {
    const transaction = this.repository.find(
      (item) => item.id.toValue() === id,
    );
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  create(data: CreateTransactionsDTO): Transaction {
    try {
      const newTransaction = TransactionFactory.create(data);

      // A última parcela de uma série não gera novas parcelas
      if (
        newTransaction.isInstallment &&
        newTransaction.currentInstallment < newTransaction.finalInstallment
      ) {
        newTransaction.generateInstallments(newTransaction.finalInstallment);
      }

      this.repository.push(newTransaction);
      for (const event of newTransaction.domainEvents) {
        this.eventBus.publish(event);
      }
      newTransaction.clearDomainEvents();

      return newTransaction;
    } catch (err) {
      throw new InternalServerErrorException({
        message:
          'Erro inesperado, entre em contato com o administrador do sistema!',
        error: err,
        adm: 'Log temporário',
      });
    }
  }

  update(id: string, data: UpdateTransactionsDTO): Transaction {
    const transaction = this.find(id);
    const changes: Omit<Partial<TransactionProps>, 'userId'> = {};

    if (data.description !== undefined) changes.description = data.description;
    if (data.value !== undefined) changes.value = data.value;
    if (data.categoryId !== undefined) changes.category = data.categoryId;
    if (data.date !== undefined) changes.date = new Date(data.date);
    if (data.isPaid !== undefined) changes.isPaid = data.isPaid;
    if (data.type !== undefined) {
      changes.type = TransactionFactory.toTransactionType(
        data.type as TypeEnum,
      );
    }
    // TODO: atualização de parcelas pendente da reestruturação de installments

    transaction.update(changes);

    return transaction;
  }

  delete(id: string): Transaction {
    const transaction = this.find(id);
    const index = this.repository.indexOf(transaction);
    if (index !== -1) {
      this.repository.splice(index, 1);
    }
    return transaction;
  }
}

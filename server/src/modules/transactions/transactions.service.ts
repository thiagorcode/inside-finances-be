import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTransactionsDTO } from './dtos/createTransactions.dto';
import { FindAllWithQueryDto } from './dtos/findAllWithQuery.dto';
import { Totalizers } from './interface/totalizers.interface';
import { UpdateTransactionsDTO } from './dtos/updateTransactions.dto';
import {
  Transaction,
  TypeTransactionEnum,
} from 'src/domain/entities/transaction.entity';
import { UniqueEntityID } from 'src/domain/common/unique-entity-id';
import { TransactionFactory } from './factory/transaction.factory';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly repository: Transaction[],
    private readonly eventBus: EventBus,
  ) {
    this.repository = [];
  }

  findAllTransactionByUser(userId: string): Transaction[] {
    return this.repository.filter((item) => item.description === userId);
  }

  findAllWithQuery({
    userId,
    categoryId,
    date,
    type,
    isPaid,
  }: FindAllWithQueryDto): Transaction[] {}

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

  findLastByUser(id: string): Transaction[] {
    return this.repository
      .filter(
        (item) => item.id === new UniqueEntityID(id) && item.isPaid === true,
      )
      .slice(0, 10);
  }

  find(id: string): Transaction {
    return this.repository.find((item) => item.id === new UniqueEntityID(id));
  }

  create(data: CreateTransactionsDTO) {
    try {
      const newTransaction = TransactionFactory.create(data);

      if (newTransaction.isInstallment) {
        newTransaction.generateInstallments(newTransaction.finalInstallment);
      }
      const transaction = this.repository.push(newTransaction);
      for (const event of newTransaction.domainEvents) {
        this.eventBus.publish(event);
      }
      newTransaction.clearDomainEvents();
    } catch (err) {
      throw new InternalServerErrorException({
        message:
          'Erro inesperado, entre em contato com o administrador do sistema!',
        error: err,
        adm: 'Log temporário',
      });
    }
  }

  update(id: string, transaction: UpdateTransactionsDTO) {
    try {
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  delete(id: string) {}
}

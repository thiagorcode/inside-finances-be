import { UpdateTransactionsDTO } from './dtos/updateTransactions.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isBefore } from 'date-fns';
import { Transactions } from './entities/transactions.entity';
import { CreateTransactionsDTO } from './dtos/createTransactions.dto';
import { ITotalizers } from './interface/totalizers';
import { ITransaction } from './interface/transaction';
import { FindAllWithQueryDto } from './dtos/findAllWithQuery.dto';
import { query } from 'express';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
  ) {}

  async findAllByUser(userId: string): Promise<ITransaction[]> {
    // Encontrar maneira para trazer o objeto category diretamente
    return await this.transactionsRepository.find({
      where: { user: { id: userId } },
      relations: ['category'],
      loadEagerRelations: true,
      select: {
        category: {
          name: true,
        },
      },
      order: {
        date: 'DESC',
        type: 'ASC',
      },
    });
  }
  async findAllWithQuery({
    userId,
    categoryId,
    date,
    type,
  }: FindAllWithQueryDto): Promise<ITransaction[]> {
    // Encontrar maneira para trazer o objeto category diretamente
    return await this.transactionsRepository.find({
      where: {
        user: { id: userId },
        ...(type !== undefined && { type: type }),
        ...(date !== undefined && { yearMonth: date }),
        ...(categoryId !== undefined && { categoryId: +categoryId }),
      },
      relations: ['category'],
      loadEagerRelations: true,
      select: {
        id: true,
        type: true,
        date: true,
        userId: true,
        value: true,
        category: {
          name: true,
          id: true,
        },
      },
      order: {
        date: 'DESC',
        type: 'ASC',
      },
    });
  }

  async findLastByUser(id: string): Promise<ITransaction[]> {
    return await this.transactionsRepository.find({
      where: { user: { id } },
      relations: ['category'],
      loadEagerRelations: true,
      select: {
        category: {
          name: true,
        },
      },
      take: 10,
      order: {
        date: 'DESC',
        type: 'ASC',
      },
    });
  }

  async totalizers(id: string): Promise<ITotalizers> {
    const transactions = await this.findAllByUser(id);

    const earnings = transactions
      .filter(
        (transaction) =>
          transaction.type === '+' && isBefore(transaction.date, new Date()),
      )
      .reduce((acc, curr) => acc + curr.value, 0);
    const expenses = transactions
      .filter(
        (transaction) =>
          transaction.type === '-' && isBefore(transaction.date, new Date()),
      )
      .reduce((acc, curr) => acc + curr.value, 0);

    const balanceAvailable = earnings - expenses;
    console.log(isBefore(transactions[0].date, new Date()));

    return {
      earnings,
      expenses,
      balanceAvailable,
    };
  }
  async find(id: string): Promise<ITransaction> {
    return await this.transactionsRepository.findOne({
      where: { id },
    });
  }

  async create(data: CreateTransactionsDTO): Promise<ITransaction> {
    // Aplicar validação se a data for maior que a data atual o isPaid deve ser falso naturalmente
    const newTransaction = Object.assign(new Transactions(), data);

    const transaction = await this.transactionsRepository.save(newTransaction);
    return transaction;
  }

  async update(id: string, transaction: UpdateTransactionsDTO) {
    return await this.transactionsRepository.update(id, transaction);
  }

  async delete(id: string) {
    await this.transactionsRepository.delete({ id });
    return { deleted: true };
  }
}

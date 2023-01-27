import { UpdateTransactionsDTO } from './dtos/updateTransactions.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from './entities/transactions.entity';
import { CreateTransactionsDTO } from './dtos/createTransactions.dto';
import { ITransaction } from './interface/transaction';
import { FindAllWithQueryDto } from './dtos/findAllWithQuery.dto';
import { Totalizers } from './interface/totalizers.interface';

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
    isPaid,
  }: FindAllWithQueryDto): Promise<ITransaction[]> {
    // Encontrar maneira para trazer o objeto category diretamente
    const query =
      this.transactionsRepository.createQueryBuilder('transactions');

    query.where('userId = :userId', { userId });
    query.leftJoinAndSelect('transactions.category', 'category');
    query.select([
      'transactions.id',
      'transactions.type',
      'transactions.date',
      'transactions.userId',
      'transactions.value',
      'category.name',
      'category.id',
    ]);
    query.orderBy('transactions.date', 'DESC');
    query.addOrderBy('transactions.type', 'ASC');

    if (type !== undefined) {
      query.andWhere('transactions.type = :type', { type });
    }

    if (date !== undefined) {
      query.andWhere('transactions.yearMonth = :yearMonth', {
        yearMonth: date,
      });
    }

    if (categoryId !== undefined) {
      query.andWhere('category.id = :categoryId', { categoryId });
    }

    if (isPaid !== undefined) {
      query.andWhere('transactions.isPaid = :isPaid', { isPaid });
    }

    const transactions = await query.getMany();

    return transactions;
  }

  findTotalizersValue(transactions: ITransaction[]) {
    const recipe = transactions
      .filter((transaction) => transaction.type === '+')
      .reduce((acc, curr) => acc + curr.value, 0);

    const expense = transactions
      .filter((transaction) => transaction.type === '-')
      .reduce((acc, curr) => acc + curr.value, 0);

    const totalBalance = recipe - expense;

    const totalizers: Totalizers = {
      recipe,
      expense,
      totalBalance,
    };
    return totalizers;
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
      },
    });
  }

  async find(id: string): Promise<ITransaction> {
    return await this.transactionsRepository.findOne({
      where: { id },
    });
  }

  /**
   * create() is a function that creates a new transaction based on the given data.
   *
   * @param data {CreateTransactionsDTO} The data to be used in creating the new transaction.
   *
   * @returns {Promise<ITransaction>} A promise containing the newly created transaction.
   *
   * @throws {InternalServerErrorException} If an unexpected error occurs, an InternalServerErrorException will be thrown with a message and an error log for the administrator.
   */
  async create(data: CreateTransactionsDTO): Promise<ITransaction> {
    try {
      const newTransaction = Object.assign(new Transactions(), data);

      const transaction = await this.transactionsRepository.save(
        newTransaction,
      );

      return transaction;
    } catch (err) {
      throw new InternalServerErrorException({
        message:
          'Erro inesperado, entre em contato com o administrador do sistema!',
        error: err,
        adm: 'Log temporário',
      });
    }
  }

  async update(id: string, transaction: UpdateTransactionsDTO) {
    try {
      return await this.transactionsRepository.update(id, transaction);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async delete(id: string) {
    await this.transactionsRepository.delete({ id });
    return { deleted: true };
  }
}

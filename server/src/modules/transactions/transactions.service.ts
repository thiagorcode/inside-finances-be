import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Transactions } from './entities/transactions.entity';
import { CreateTransactionsDTO } from './dtos/createTransactions.dto';
import { ITransaction } from './interface/transaction.interface';
import { FindAllWithQueryDto } from './dtos/findAllWithQuery.dto';
import { Totalizers } from './interface/totalizers.interface';
import { UpdateTransactionsDTO } from './dtos/updateTransactions.dto';
import { addMonths, parseISO } from 'date-fns';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
    private dataSource: DataSource,
  ) {}

  findAllByUser(userId: string): Promise<ITransaction[]> {
    // Encontrar maneira para trazer o objeto category diretamente
    return this.transactionsRepository.find({
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
      'transactions.isPaid',
      'transactions.bank',
      'transactions.description',
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

  findLastByUser(id: string): Promise<ITransaction[]> {
    return this.transactionsRepository.find({
      where: { user: { id }, isPaid: true },
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

  find(id: string): Promise<ITransaction> {
    return this.transactionsRepository.findOne({
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
      const newTransaction = Object.assign(new Transactions(), { ...data });

      const transaction = await this.transactionsRepository.save(
        newTransaction,
      );

      if (data.finalInstallment && data.type === '-') {
        await this.createInstallmentTransaction(data);
      }

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

  async createInstallmentTransaction(data: CreateTransactionsDTO) {
    const finalInstallment = data.finalInstallment - data.installment;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const transactionsInstallment = [];

      for (let i = 1; i <= finalInstallment; i++) {
        const newTransaction: Omit<ITransaction, 'id'> = Object.assign(
          new Transactions(),
          {
            ...data,
            installment: data.installment + i,
            finalInstallment: data.finalInstallment,
            isPaid: false,
            date: addMonths(parseISO(data.date), i),
          },
        );
        transactionsInstallment.push(newTransaction);
      }
      await queryRunner.manager.save<Transactions>(transactionsInstallment);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
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
    return this.transactionsRepository.delete({ id });
  }
}

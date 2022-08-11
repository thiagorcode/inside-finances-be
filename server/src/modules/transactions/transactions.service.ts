import { UpdateTransactionsDTO } from './dtos/updateTransactions.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isBefore } from 'date-fns';
import { Transactions } from './transactions.entity';
import { CreateTransactionsDTO } from './dtos/createTransactions.dto';
import { ITotalizers } from './interface/totalizers';
import { ITransaction } from './interface/transaction';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
  ) {}

  async findAllByUser(id: string): Promise<ITransaction[]> {
    return await this.transactionsRepository.find({ user: { id } });
  }

  async findLastByUser(id: string): Promise<ITransaction[]> {
    return await this.transactionsRepository.find({
      where: { user: { id } },
      take: 10,
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
    data.dtCreate = new Date();
    // Aplicar validação se a data for maior que a data atual o isPaid deve ser falso naturalmente
    const newTransaction = Object.assign(new Transactions(), data);

    const transaction = await this.transactionsRepository.save(newTransaction);
    return transaction;
  }

  async update(id: string, transaction: UpdateTransactionsDTO) {
    return this.transactionsRepository.update(id, transaction).then(() => {
      return this.transactionsRepository.findOne({ id });
    });
  }

  async delete(id: string) {
    await this.transactionsRepository.delete({ id });
    return { deleted: true };
  }
}

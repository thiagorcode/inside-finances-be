import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transactions } from './transactions.entity';
import { TransactionsDTO } from './dtos/transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
  ) {}

  async findAllbyUser(id: string): Promise<TransactionsDTO[]> {
    return await this.transactionsRepository.find({ user: { id } });
  }

  async find(id: string): Promise<TransactionsDTO> {
    return await this.transactionsRepository.findOne({
      where: { id },
    });
  }

  async create(data: Partial<TransactionsDTO>): Promise<TransactionsDTO> {
    data.dtCreate = new Date();
    // Aplicar validação se a data for maior que a data atual o isPaid deve ser falso naturalmente
    const newTransaction = Object.assign(new Transactions(), data);

    const transaction = await this.transactionsRepository.save(newTransaction);
    return transaction;
  }

  async update(id: string, transaction: Partial<TransactionsDTO>) {
    return this.transactionsRepository.update(id, transaction).then(() => {
      return this.transactionsRepository.findOne({ id: +id });
    });
  }

  async delete(id: string) {
    await this.transactionsRepository.delete({ id: +id });
    return { deleted: true };
  }
}

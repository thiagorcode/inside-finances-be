import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionsCategory } from './transactionsCategory.entity';
import { TransactionsCategoryDTO } from './transactionsCategory.dto';

@Injectable()
export class TransactionsCategoryService {
  constructor(
    @InjectRepository(TransactionsCategory)
    private transactionsRepository: Repository<TransactionsCategory>,
  ) {}

  async findAll(): Promise<TransactionsCategoryDTO[]> {
    return await this.transactionsRepository.find();
  }

  async find(id: string): Promise<TransactionsCategoryDTO> {
    return await this.transactionsRepository.findOne({
      where: { id },
    });
  }

  async create(
    data: Partial<TransactionsCategoryDTO>,
  ): Promise<TransactionsCategoryDTO> {
    data.dtCreate = new Date();
    // Aplicar validação se a data for maior que a data atual o isPaid deve ser falso naturalmente
    const newTransaction = Object.assign(new TransactionsCategory(), data);

    const transaction = await this.transactionsRepository.save(newTransaction);
    return transaction;
  }

  async update(id: string, transaction: Partial<TransactionsCategoryDTO>) {
    return this.transactionsRepository.update(id, transaction).then(() => {
      return this.transactionsRepository.findOne({ id: +id });
    });
  }

  async delete(id: string) {
    await this.transactionsRepository.delete({ id: +id });
    return { deleted: true };
  }
}

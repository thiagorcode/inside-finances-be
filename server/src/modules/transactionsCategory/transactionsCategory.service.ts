import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionsCategory } from './entities/transactionsCategory.entity';
import { TransactionsCategoryDTO } from './dtos/createTransactionsCategory.dto';

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
      where: { id: +id },
    });
  }

  async create(
    data: Partial<TransactionsCategoryDTO>,
  ): Promise<TransactionsCategoryDTO> {
    const newCategory = Object.assign(new TransactionsCategory(), data);

    const transaction = await this.transactionsRepository.save(newCategory);
    return transaction;
  }

  async update(id: string, transaction: Partial<TransactionsCategoryDTO>) {
    return this.transactionsRepository.update(id, transaction).then(() => {
      return this.transactionsRepository.findOne({ where: { id: +id } });
    });
  }

  async delete(id: string) {
    await this.transactionsRepository.delete({ id: +id });
    return { deleted: true };
  }
}

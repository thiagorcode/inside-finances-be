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

  findAll(): Promise<TransactionsCategoryDTO[]> {
    return this.transactionsRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  find(id: string): Promise<TransactionsCategoryDTO> {
    return this.transactionsRepository.findOne({
      where: { id },
    });
  }

  async create(
    data: Partial<TransactionsCategoryDTO>,
  ): Promise<TransactionsCategoryDTO> {
    const newCategory = Object.assign(new TransactionsCategory(), data);

    const transaction = await this.transactionsRepository.save(newCategory);
    return transaction;
  }

  update(id: string, transaction: Partial<TransactionsCategoryDTO>) {
    return this.transactionsRepository.update(id, transaction);
  }

  delete(id: string) {
    return this.transactionsRepository.delete({ id });
  }
}

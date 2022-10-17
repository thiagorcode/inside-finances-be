import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsCategoryController } from './transactionsCategory.controller';
import { TransactionsCategoryService } from './transactionsCategory.service';
import { TransactionsCategory } from './entities/transactionsCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionsCategory])],
  controllers: [TransactionsCategoryController],
  providers: [TransactionsCategoryService],
  exports: [TransactionsCategoryService],
})
export class TransactionsCategoryModule {}

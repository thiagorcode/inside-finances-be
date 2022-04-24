import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
  // UseGuards,
} from '@nestjs/common';

import { TransactionsCategoryService } from './transactionsCategory.service';
import { TransactionsCategoryDTO } from './transactionsCategory.dto';
// import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';

@Controller('transactions')
export class TransactionsCategoryController {
  constructor(
    private transactionsCategoryService: TransactionsCategoryService,
  ) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAllTransactions() {
    const transactions = await this.transactionsCategoryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Transactions fetched successfully',
      transactions,
    };
  }

  @Post()
  async create(@Body() data: TransactionsCategoryDTO) {
    const transaction = await this.transactionsCategoryService.create(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Transactions created successfully',
      transaction,
    };
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findTransaction(@Param('id') id: string) {
    const transaction = await this.transactionsCategoryService.find(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transactions fetched successfully',
      transaction,
    };
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  async updateTransaction(
    @Param('id') id: string,
    @Body() data: Partial<TransactionsCategoryDTO>,
  ) {
    await this.transactionsCategoryService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transactions updated successfully',
    };
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async deleteTransaction(@Param('id') id: string) {
    await this.transactionsCategoryService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transactions deleted successfully',
    };
  }
}

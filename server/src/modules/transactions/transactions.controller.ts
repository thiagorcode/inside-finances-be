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

import { TransactionsService } from './transactions.service';
import { TransactionsDTO } from './dtos/transactions.dto';
// import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('user/:idUser')
  // @UseGuards(JwtAuthGuard)
  // TODO: Verificar a possibilidade se vai criar os valores totais aqui ou em outra rota
  async findAllTransactionsByUser(@Param('idUser') idUser: string) {
    const transactions = await this.transactionsService.findAllbyUser(idUser);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transactions fetched successfully',
      transactions,
    };
  }

  @Post()
  async create(@Body() data: TransactionsDTO) {
    const transaction = await this.transactionsService.create(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Transactions created successfully',
      transaction,
    };
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findTransaction(@Param('id') id: string) {
    const transaction = await this.transactionsService.find(id);
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
    @Body() data: Partial<TransactionsDTO>,
  ) {
    await this.transactionsService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transactions updated successfully',
    };
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async deleteTransaction(@Param('id') id: string) {
    await this.transactionsService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transactions deleted successfully',
    };
  }
}

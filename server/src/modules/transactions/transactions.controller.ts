import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
  Query,
  ValidationPipe,
  // UseGuards,
} from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionsDTO } from './dtos/createTransactions.dto';
import { FindAllWithQueryDto } from './dtos/findAllWithQuery.dto';
// import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('user/:userId')
  // @UseGuards(JwtAuthGuard)
  // TODO: Verificar a possibilidade se vai criar os valores totais aqui ou em outra rota
  async findAllWithQuery(
    @Param('userId') userId: string,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: FindAllWithQueryDto,
  ) {
    const transactions = await this.transactionsService.findAllWithQuery({
      userId,
      categoryId: query.categoryId,
      type: query.type,
      date: query.date,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Transactions fetched successfully',
      transactions,
    };
  }

  @Get('user/:userId/last')
  // @UseGuards(JwtAuthGuard)
  // TODO: Verificar possibilidade de pegar o ID pelo token
  async findLastTransactionsByUser(@Param('userId') userId: string) {
    const transactions = await this.transactionsService.findLastByUser(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Transactions fetched successfully',
      transactions,
    };
  }

  @Get('user/:userId/totalizers')
  // @UseGuards(JwtAuthGuard)
  // TODO: Verificar possibilidade de pegar o ID pelo token
  async totalizers(@Param('userId') userId: string) {
    const totalizers = await this.transactionsService.totalizers(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Totalizers fetched successfully',
      totalizers,
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

  @Post()
  async create(@Body() data: CreateTransactionsDTO) {
    const transaction = await this.transactionsService.create(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Transactions created successfully',
      transaction,
    };
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  async updateTransaction(
    @Param('id') id: string,
    @Body() data: CreateTransactionsDTO,
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

  @Get('user/:userId/totalizer')
  // @UseGuards(JwtAuthGuard)
  // Temporária
  async findTotalizersValue(
    @Param('userId') userId: string,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: FindAllWithQueryDto,
  ) {
    const transactions = await this.transactionsService.findAllWithQuery({
      userId,
      categoryId: query.categoryId,
      type: query.type,
      date: query.date,
      isPaid: true,
    });

    const totalizers = await this.transactionsService.findTotalizersValue(
      transactions,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Totalizers fetched successfully',
      totalizers,
    };
  }
}

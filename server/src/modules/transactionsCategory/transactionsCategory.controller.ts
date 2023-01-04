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
import { TransactionsCategoryDTO } from './dtos/transactionsCategory.dto';
// import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';

@Controller('category')
export class TransactionsCategoryController {
  constructor(
    private transactionsCategoryService: TransactionsCategoryService,
  ) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAllCategorys() {
    const category = await this.transactionsCategoryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Category fetched successfully',
      category,
    };
  }

  @Post()
  async create(@Body() data: TransactionsCategoryDTO) {
    const category = await this.transactionsCategoryService.create(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Category created successfully',
      category,
    };
  }

  // @Get(':id')
  // // @UseGuards(JwtAuthGuard)
  // async findTransaction(@Param('id') id: string) {
  //   const category = await this.transactionsCategoryService.find(id);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'Category fetched successfully',
  //     category,
  //   };
  // }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  async updateTransaction(
    @Param('id') id: string,
    @Body() data: Partial<TransactionsCategoryDTO>,
  ) {
    await this.transactionsCategoryService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category updated successfully',
    };
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async deleteTransaction(@Param('id') id: string) {
    await this.transactionsCategoryService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category deleted successfully',
    };
  }
}

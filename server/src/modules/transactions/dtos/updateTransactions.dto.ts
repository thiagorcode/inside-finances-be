import { CreateTransactionsDTO } from './createTransactions.dto';
import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTransactionsDTO extends PartialType(CreateTransactionsDTO) {
  @IsOptional()
  userId?: string;
}

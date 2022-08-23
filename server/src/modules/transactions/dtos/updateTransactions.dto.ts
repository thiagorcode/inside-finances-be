import { CreateTransactionsDTO } from './createTransactions.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTransactionsDTO extends PartialType(CreateTransactionsDTO) {}

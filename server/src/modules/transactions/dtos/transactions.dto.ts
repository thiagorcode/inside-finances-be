import { UsersDTO } from '../../users/dtos/users.dto';
import { TransactionsCategoryDTO } from '../../transactionsCategory/dtos/transactionsCategory.dto';

export class TransactionsDTO {
  id: number;
  description: string;
  value: number;
  category: Partial<TransactionsCategoryDTO>;
  year: number;
  // month: number;
  // day: number;
  yearMonth: string;
  date: Date;
  dtCreate: Date;
  isPaid: boolean;
  originCreate?: 'web' | 'telegram';
  type: '+' | '-';
  specification?: string;
  bank?: string;
  user: Partial<UsersDTO>;
}

import { UsersDTO } from '../users/users.dto';
import { TransactionsCategoryDTO } from '../transactionsCategory/transactionsCategory.dto';

export class TransactionsDTO {
  id: number;
  description: string;
  value: number;
  category: Partial<TransactionsCategoryDTO>;
  year: number;
  // month: number;
  // day: number;
  yearMonth: string;
  yearMonthDay: string;
  dtCreate: Date;
  isPaid: boolean;
  originCreate?: 'web' | 'telegram';
  type: '+' | '-';
  user: Partial<UsersDTO>;
}

import { UsersDTO } from '../users/users.dto';

export class TransactionsCategoryDTO {
  id: number;
  description: string;
  value: number;
  category: string;
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

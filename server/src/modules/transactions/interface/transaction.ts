import { CreateUserDTO } from '../../users/dtos/createUser.dto';
import { TransactionsCategoryDTO } from '../../transactionsCategory/dtos/transactionsCategory.dto';

export interface ITransaction {
  id: string;
  value: number;
  category: Partial<TransactionsCategoryDTO>;
  // month: number;
  // day: number;
  date: Date;
  type: '+' | '-';
  user: Partial<CreateUserDTO>;
}

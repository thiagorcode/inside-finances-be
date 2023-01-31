import { TypeEnum } from './../../../enums/type.enum';
import { CreateUserDTO } from '../../users/dtos/createUser.dto';
import { TransactionsCategoryDTO } from '../../transactionsCategory/dtos/createTransactionsCategory.dto';

export interface ITransaction {
  id: string;
  value: number;
  category: Partial<TransactionsCategoryDTO>;
  // month: number;
  // day: number;
  date: Date;
  type: TypeEnum;
  user: Partial<CreateUserDTO>;
}

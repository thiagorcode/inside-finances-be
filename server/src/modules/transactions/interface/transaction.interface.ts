import { TypeEnum } from './../../../enums/type.enum';
import { CreateUserDTO } from '../../users/dtos/createUser.dto';
import { TransactionsCategoryDTO } from '../../transactionsCategory/dtos/createTransactionsCategory.dto';

export interface ITransaction {
  id: string;
  value: number;
  categoryId: string;
  date: Date;
  type: TypeEnum;
  userId: string;
  specification?: string;
  bank?: string;
  originCreate?: string;
  installment?: number;
  finalInstallment?: number;
  isPaid: boolean;
}

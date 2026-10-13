import { EventBus } from '@nestjs/cqrs';

import { TransactionsService } from './transactions.service';
import {
  Transaction,
  TypeTransactionEnum,
} from '../../domain/entities/transaction.entity';

describe('findTotalizersValue', () => {
  it('should return the correct recipe, expense, and totalBalance', () => {
    const eventBusStub = { publish: jest.fn() } as unknown as EventBus;
    const service = new TransactionsService(eventBusStub);

    // O totalizador só lê type e value — as demais props não interferem
    const transactions = [
      { type: TypeTransactionEnum.RECIPE, value: 10 },
      { type: TypeTransactionEnum.RECIPE, value: 20 },
      { type: TypeTransactionEnum.EXPENSE, value: 5 },
    ] as unknown as Transaction[];

    const expectedResult = {
      recipe: 30,
      expense: 5,
      totalBalance: 25,
    };

    expect(service.findTotalizersValue(transactions)).toEqual(expectedResult);
  });
});

import { addMonths } from 'date-fns';

import { InstallmentsGeneratedHandler } from './installments-generated.handler';
import { InstallmentsGeneratedEvent } from '../../../domain/events/transaction/installments-generated.event';
import {
  Transaction,
  TypeExpenseEnum,
  TypeTransactionEnum,
} from '../../../domain/entities/transaction.entity';
import { UniqueEntityID } from '../../../domain/common/unique-entity-id';

const makeEvent = (
  overrides: Partial<InstallmentsGeneratedEvent['payload']> = {},
): InstallmentsGeneratedEvent =>
  new InstallmentsGeneratedEvent(new UniqueEntityID(), {
    userId: 'user-1',
    value: 150.5,
    date: new Date(2026, 2, 10, 12),
    finalInstallment: 4,
    currentInstallment: 1,
    category: 'category-1',
    card: 'Nubank',
    description: 'Notebook',
    type: TypeTransactionEnum.EXPENSE,
    expenseType: TypeExpenseEnum.ESSENTIAL,
    originCreate: 'web',
    ...overrides,
  });

describe('InstallmentsGeneratedHandler', () => {
  let handler: InstallmentsGeneratedHandler;
  // O repositório do handler ainda é um stub em memória (TODO no código-fonte);
  // enquanto o repositório DDD não é conectado, conferimos o persistido direto
  const stored = () =>
    (handler as unknown as { transactionRepo: Transaction[] }).transactionRepo;

  beforeEach(() => {
    handler = new InstallmentsGeneratedHandler();
  });

  it('should create the remaining installments of the series', async () => {
    const event = makeEvent();

    await handler.handle(event);

    const installments = stored();

    expect(installments).toHaveLength(3);
    expect(installments.map((item) => item.currentInstallment)).toEqual([
      2, 3, 4,
    ]);
  });

  it('should schedule each installment one month after the previous one', async () => {
    const baseDate = new Date(2026, 2, 10, 12);

    await handler.handle(makeEvent({ date: baseDate }));

    stored().forEach((installment, index) => {
      expect(installment.date.getTime()).toBe(
        addMonths(baseDate, index + 1).getTime(),
      );
    });
  });

  it('should create the installments as unpaid, carrying the data of the original transaction', async () => {
    await handler.handle(makeEvent());

    stored().forEach((installment) => {
      expect(installment.isPaid).toBe(false);
      expect(installment.isInstallment).toBe(true);
      expect(installment.value).toBe(150.5);
      expect(installment.description).toBe('Notebook');
      expect(installment.card).toBe('Nubank');
      expect(installment.type).toBe(TypeTransactionEnum.EXPENSE);
      expect(installment.expenseType).toBe(TypeExpenseEnum.ESSENTIAL);
      expect(installment.userId).toBe('user-1');
      expect(installment.finalInstallment).toBe(4);
    });
  });

  it('should derive the period of each installment from its own date', async () => {
    const baseDate = new Date(2026, 11, 20, 12); // 20/12/2026 — vira o ano

    await handler.handle(makeEvent({ date: baseDate }));

    expect(stored()[0].yearMonth).toBe('2027-01');
    expect(stored()[0].year).toBe(2027);
  });

  it('should create nothing when the current installment is already the last', async () => {
    await handler.handle(
      makeEvent({ currentInstallment: 4, finalInstallment: 4 }),
    );

    expect(stored()).toHaveLength(0);
  });
});

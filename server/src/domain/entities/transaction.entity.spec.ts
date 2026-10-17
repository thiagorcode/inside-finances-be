import {
  Transaction,
  TransactionProps,
  TypeExpenseEnum,
  TypeTransactionEnum,
} from './transaction.entity';
import { UniqueEntityID } from '../common/unique-entity-id';
import { InstallmentsGeneratedEvent } from '../events/transaction/installments-generated.event';

// Data construída com componentes locais: janeiro (0) e novembro (10)
// exercitam o padding do mês em yearMonth
const makeProps = (
  overrides: Partial<TransactionProps> = {},
): TransactionProps => ({
  userId: 'user-1',
  value: 100,
  type: TypeTransactionEnum.EXPENSE,
  category: 'category-1',
  description: 'Almoço',
  date: new Date(2026, 2, 5),
  isPaid: false,
  expenseType: TypeExpenseEnum.ESSENTIAL,
  originCreate: 'app',
  isInstallment: false,
  currentInstallment: 0,
  finalInstallment: 0,
  ...overrides,
});

describe('Transaction', () => {
  describe('create', () => {
    it('should derive year and yearMonth from date', () => {
      const transaction = Transaction.create(makeProps());

      expect(transaction.year).toBe(2026);
      expect(transaction.yearMonth).toBe('2026-03');
    });

    it('should keep the yearMonth month zero-padded', () => {
      const transaction = Transaction.create(
        makeProps({ date: new Date(2026, 0, 15) }),
      );

      expect(transaction.yearMonth).toBe('2026-01');
    });

    it('should generate a unique id when none is given', () => {
      const transaction = Transaction.create(makeProps());

      expect(transaction.id.toValue()).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      );
    });

    it('should keep the given id', () => {
      const id = new UniqueEntityID();

      const transaction = Transaction.create(makeProps(), id);

      expect(transaction.id.toValue()).toBe(id.toValue());
    });
  });

  describe('update', () => {
    it('should merge only the informed changes', () => {
      const transaction = Transaction.create(
        makeProps({ description: 'Almoço', value: 100 }),
      );

      transaction.update({ description: 'Jantar' });

      expect(transaction.description).toBe('Jantar');
      expect(transaction.value).toBe(100);
    });

    it('should re-derive year and yearMonth when the date changes', () => {
      const transaction = Transaction.create(makeProps());

      transaction.update({ date: new Date(2025, 11, 1) });

      expect(transaction.year).toBe(2025);
      expect(transaction.yearMonth).toBe('2025-12');
    });

    it('should keep the period when the date is not informed', () => {
      const transaction = Transaction.create(
        makeProps({ date: new Date(2026, 0, 15) }),
      );

      transaction.update({ value: 500 });

      expect(transaction.year).toBe(2026);
      expect(transaction.yearMonth).toBe('2026-01');
    });
  });

  describe('generateInstallments', () => {
    it('should throw when the transaction is not an installment one', () => {
      const transaction = Transaction.create(
        makeProps({ isInstallment: false }),
      );

      expect(() => transaction.generateInstallments(3)).toThrow(
        'Invalid installments',
      );
    });

    it('should throw when finalInstallment is before or equal the current one', () => {
      const transaction = Transaction.create(
        makeProps({
          isInstallment: true,
          currentInstallment: 3,
          finalInstallment: 3,
        }),
      );

      expect(() => transaction.generateInstallments(2)).toThrow(
        'Invalid installments',
      );
      expect(() => transaction.generateInstallments(3)).toThrow(
        'Invalid installments',
      );
    });

    it('should record an InstallmentsGeneratedEvent with the series data', () => {
      const transaction = Transaction.create(
        makeProps({
          isInstallment: true,
          currentInstallment: 1,
          finalInstallment: 1,
          value: 150.5,
        }),
      );

      transaction.generateInstallments(5);

      expect(transaction.domainEvents).toHaveLength(1);

      expect(transaction.domainEvents[0]).toBeInstanceOf(
        InstallmentsGeneratedEvent,
      );

      // o aggregate armazena os eventos como DomainEvent — estreita o tipo
      const event = transaction.domainEvents[0] as InstallmentsGeneratedEvent;
      expect(event.transactionId.toValue()).toBe(transaction.id.toValue());
      expect(event.payload.userId).toBe('user-1');
      expect(event.payload.value).toBe(150.5);
      expect(event.payload.currentInstallment).toBe(1);
      expect(event.payload.finalInstallment).toBe(5);
    });

    it('should update finalInstallment on the entity', () => {
      const transaction = Transaction.create(
        makeProps({
          isInstallment: true,
          currentInstallment: 1,
          finalInstallment: 1,
        }),
      );

      transaction.generateInstallments(4);

      expect(transaction.finalInstallment).toBe(4);
    });

    it('should clear domain events', () => {
      const transaction = Transaction.create(
        makeProps({
          isInstallment: true,
          currentInstallment: 1,
          finalInstallment: 1,
        }),
      );

      transaction.generateInstallments(4);
      expect(transaction.domainEvents).toHaveLength(1);

      transaction.clearDomainEvents();
      expect(transaction.domainEvents).toHaveLength(0);
    });
  });

  describe('toJSON', () => {
    it('should expose only the public state (no props/domainEvents leaks)', () => {
      const date = new Date(2026, 2, 5);
      const transaction = Transaction.create(
        makeProps({
          userId: 'user-1',
          value: 100,
          type: TypeTransactionEnum.RECIPE,
          category: 'category-1',
          description: 'Salário',
          date,
          isPaid: true,
          expenseType: TypeExpenseEnum.NOT_ESSENTIAL,
          originCreate: 'web',
          isInstallment: false,
          currentInstallment: 0,
          finalInstallment: 0,
        }),
      );

      expect(transaction.toJSON()).toEqual({
        id: transaction.id.toString(),
        userId: 'user-1',
        value: 100,
        type: TypeTransactionEnum.RECIPE,
        category: 'category-1',
        card: undefined,
        description: 'Salário',
        date,
        isPaid: true,
        expenseType: TypeExpenseEnum.NOT_ESSENTIAL,
        originCreate: 'web',
        isInstallment: false,
        currentInstallment: 0,
        finalInstallment: 0,
        yearMonth: '2026-03',
        year: 2026,
      });
    });
  });
});

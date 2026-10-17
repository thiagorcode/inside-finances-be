import { TransactionFactory } from './transaction.factory';
import { CreateTransactionsDTO } from '../dtos/createTransactions.dto';
import { TypeTransactionEnum } from '../../../domain/entities/transaction.entity';
import { TypeEnum } from '../../../enums/type.enum';

// Meio-dia UTC mantém o dia/mês local estável em qualquer timezone (±14h)
const makeDTO = (
  overrides: Partial<CreateTransactionsDTO> = {},
): CreateTransactionsDTO => ({
  description: 'Almoço',
  value: 50,
  categoryId: 'category-1',
  date: '2026-03-05T12:00:00.000Z',
  isPaid: true,
  type: TypeEnum.Expense,
  userId: 'user-1',
  ...overrides,
});

describe('TransactionFactory', () => {
  describe('toTransactionType', () => {
    it('should map the API enum +/- to the domain enum', () => {
      expect(TransactionFactory.toTransactionType(TypeEnum.Recipe)).toBe(
        TypeTransactionEnum.RECIPE,
      );
      expect(TransactionFactory.toTransactionType(TypeEnum.Expense)).toBe(
        TypeTransactionEnum.EXPENSE,
      );
    });
  });

  describe('create', () => {
    it('should convert the DTO fields to the domain props', () => {
      const transaction = TransactionFactory.create(
        makeDTO({
          bank: 'Nubank',
          originCreate: 'web',
          type: TypeEnum.Recipe,
        }),
      );

      expect(transaction.userId).toBe('user-1');
      expect(transaction.value).toBe(50);
      expect(transaction.description).toBe('Almoço');
      // bank (DTO) vira card (domínio) e categoryId vira category
      expect(transaction.card).toBe('Nubank');
      expect(transaction.category).toBe('category-1');
      expect(transaction.type).toBe(TypeTransactionEnum.RECIPE);
      expect(transaction.originCreate).toBe('web');
      expect(transaction.isPaid).toBe(true);
    });

    it('should not set an installment series by default', () => {
      const transaction = TransactionFactory.create(makeDTO());

      expect(transaction.isInstallment).toBe(false);
      expect(transaction.currentInstallment).toBe(0);
      expect(transaction.finalInstallment).toBe(0);
    });

    it('should start the series at the given installment', () => {
      const transaction = TransactionFactory.create(
        makeDTO({ installment: 2, finalInstallment: 6 }),
      );

      expect(transaction.isInstallment).toBe(true);
      expect(transaction.currentInstallment).toBe(2);
      expect(transaction.finalInstallment).toBe(6);
    });

    it('should start at 1 when only the final installment is informed', () => {
      const transaction = TransactionFactory.create(
        makeDTO({ finalInstallment: 3 }),
      );

      expect(transaction.isInstallment).toBe(true);
      expect(transaction.currentInstallment).toBe(1);
      expect(transaction.finalInstallment).toBe(3);
    });

    it('should treat a single installment as a plain transaction', () => {
      const transaction = TransactionFactory.create(
        makeDTO({ finalInstallment: 1 }),
      );

      expect(transaction.isInstallment).toBe(false);
      expect(transaction.currentInstallment).toBe(1);
      expect(transaction.finalInstallment).toBe(1);
    });

    it('should default originCreate to app when the DTO omits it', () => {
      const transaction = TransactionFactory.create(makeDTO());

      expect(transaction.originCreate).toBe('app');
    });

    it('should derive the period from the DTO date', () => {
      const transaction = TransactionFactory.create(makeDTO());

      expect(transaction.yearMonth).toBe('2026-03');
      expect(transaction.year).toBe(2026);
    });
  });
});

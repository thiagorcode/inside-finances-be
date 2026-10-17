import { EventBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionsDTO } from './dtos/createTransactions.dto';
import { UpdateTransactionsDTO } from './dtos/updateTransactions.dto';
import {
  Transaction,
  TypeTransactionEnum,
} from '../../domain/entities/transaction.entity';
import { InstallmentsGeneratedEvent } from '../../domain/events/transaction/installments-generated.event';
import { TypeEnum } from '../../enums/type.enum';

// Meio-dia UTC mantém o dia/mês local estável em qualquer timezone (±14h)
const makeCreateDTO = (
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

describe('TransactionsService', () => {
  let service: TransactionsService;
  let publish: jest.Mock;

  beforeEach(() => {
    publish = jest.fn();
    // TODO: trocar pelo repositório real quando a persistência DDD for conectada
    service = new TransactionsService({ publish } as unknown as EventBus);
  });

  describe('create', () => {
    it('should create a plain transaction (no events published)', () => {
      const transaction = service.create(makeCreateDTO());

      expect(transaction.description).toBe('Almoço');
      expect(transaction.value).toBe(50);
      expect(transaction.isInstallment).toBe(false);
      expect(transaction.yearMonth).toBe('2026-03');
      expect(publish).not.toHaveBeenCalled();
    });

    it('should publish one InstallmentsGeneratedEvent for a new series', () => {
      const transaction = service.create(
        makeCreateDTO({
          description: 'Notebook',
          installment: 1,
          finalInstallment: 3,
        }),
      );

      expect(transaction.isInstallment).toBe(true);
      expect(transaction.currentInstallment).toBe(1);
      expect(transaction.finalInstallment).toBe(3);

      expect(publish).toHaveBeenCalledTimes(1);
      const event = publish.mock.calls[0][0];
      expect(event).toBeInstanceOf(InstallmentsGeneratedEvent);
      expect(event.transactionId.toValue()).toBe(transaction.id.toValue());
      expect(event.payload.finalInstallment).toBe(3);
      expect(event.payload.description).toBe('Notebook');
      // o aggregate não deve carregar eventos já публиcados
      expect(transaction.domainEvents).toHaveLength(0);
    });

    it('should not generate new installments for the last installment of a series', () => {
      service.create(makeCreateDTO({ installment: 3, finalInstallment: 3 }));

      expect(publish).not.toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('should return the transaction by id', () => {
      const created = service.create(makeCreateDTO());

      const found = service.find(created.id.toValue());

      expect(found.id.toValue()).toBe(created.id.toValue());
    });

    it('should throw NotFoundException for an unknown id', () => {
      expect(() => service.find('unknown-id')).toThrow(NotFoundException);
    });
  });

  describe('findAllTransactionByUser', () => {
    it('should list only the transactions of the user', () => {
      service.create(makeCreateDTO());
      service.create(makeCreateDTO({ description: 'Salário' }));
      service.create(makeCreateDTO({ userId: 'user-2' }));

      const transactions = service.findAllTransactionByUser('user-1');

      expect(transactions).toHaveLength(2);
      expect(transactions.every((item) => item.userId === 'user-1')).toBe(true);
    });
  });

  describe('findAllWithQuery', () => {
    beforeEach(() => {
      // despesa paga de março (category-1)
      service.create(makeCreateDTO({ value: 10 }));
      // receita paga de março (category-2)
      service.create(
        makeCreateDTO({
          value: 20,
          type: TypeEnum.Recipe,
          categoryId: 'category-2',
          description: 'Salário',
        }),
      );
      // despesa não paga de abril (category-1)
      service.create(
        makeCreateDTO({
          value: 30,
          isPaid: false,
          date: '2026-04-05T12:00:00.000Z',
        }),
      );
      // outro usuário
      service.create(makeCreateDTO({ value: 40, userId: 'user-2' }));
    });

    it('should return only the transactions of the given user', () => {
      const transactions = service.findAllWithQuery({ userId: 'user-1' });

      expect(transactions).toHaveLength(3);
    });

    it('should filter by category', () => {
      const transactions = service.findAllWithQuery({
        userId: 'user-1',
        categoryId: 'category-2',
      });

      expect(transactions).toHaveLength(1);
      expect(transactions[0].description).toBe('Salário');
    });

    it('should filter by month (date=YYYY-MM)', () => {
      const transactions = service.findAllWithQuery({
        userId: 'user-1',
        date: '2026-04',
      });

      expect(transactions).toHaveLength(1);
      expect(transactions[0].isPaid).toBe(false);
    });

    it('should filter by type (+ / -)', () => {
      const recipes = service.findAllWithQuery({
        userId: 'user-1',
        type: '+',
      });

      expect(recipes).toHaveLength(1);
      expect(recipes[0].type).toBe(TypeTransactionEnum.RECIPE);

      const expenses = service.findAllWithQuery({
        userId: 'user-1',
        type: '-',
      });

      expect(expenses).toHaveLength(2);
    });

    it('should filter by payment status', () => {
      const unpaid = service.findAllWithQuery({
        userId: 'user-1',
        isPaid: false,
      });

      expect(unpaid).toHaveLength(1);
      expect(unpaid[0].yearMonth).toBe('2026-04');
    });

    it('should combine filters', () => {
      const transactions = service.findAllWithQuery({
        userId: 'user-1',
        type: '-',
        isPaid: true,
      });

      expect(transactions).toHaveLength(1);
      expect(transactions[0].value).toBe(10);
    });

    it('should return an empty list when nothing matches', () => {
      const transactions = service.findAllWithQuery({
        userId: 'user-3',
      });

      expect(transactions).toEqual([]);
    });
  });

  describe('findLastByUser', () => {
    it('should return only paid transactions, most recent first, capped at 10', () => {
      // série ao longo do ano (janeiro a dezembro)
      for (let month = 1; month <= 12; month++) {
        service.create(
          makeCreateDTO({
            date: `2026-${String(month).padStart(2, '0')}-15T12:00:00.000Z`,
          }),
        );
      }
      // não paga e mais recente: não deve aparecer
      service.create(
        makeCreateDTO({
          isPaid: false,
          date: '2026-12-25T12:00:00.000Z',
        }),
      );

      const transactions = service.findLastByUser('user-1');

      expect(transactions).toHaveLength(10);
      expect(transactions[0].yearMonth).toBe('2026-12');
      expect(transactions.every((item) => item.isPaid)).toBe(true);
    });
  });

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

    it('should totalize empty lists as zero', () => {
      expect(service.findTotalizersValue([])).toEqual({
        recipe: 0,
        expense: 0,
        totalBalance: 0,
      });
    });

    it('should return a negative balance when the expenses exceed the recipes', () => {
      const transactions = [
        { type: TypeTransactionEnum.RECIPE, value: 10 },
        { type: TypeTransactionEnum.EXPENSE, value: 35 },
      ] as unknown as Transaction[];

      const totalizers = service.findTotalizersValue(transactions);

      expect(totalizers.recipe).toBe(10);
      expect(totalizers.expense).toBe(35);
      expect(totalizers.totalBalance).toBe(-25);
    });
  });

  describe('update', () => {
    it('should update only the informed fields', () => {
      const created = service.create(
        makeCreateDTO({ description: 'Almoço', value: 50 }),
      );

      const updated = service.update(created.id.toValue(), {
        description: 'Jantar',
      } as UpdateTransactionsDTO);

      expect(updated.description).toBe('Jantar');
      expect(updated.value).toBe(50);
    });

    it('should map the DTO fields and re-derive the period', () => {
      const created = service.create(makeCreateDTO());

      const updated = service.update(created.id.toValue(), {
        value: 999,
        categoryId: 'category-2',
        date: '2025-06-10T12:00:00.000Z',
        type: '+',
        isPaid: false,
      } as UpdateTransactionsDTO);

      expect(updated.value).toBe(999);
      expect(updated.category).toBe('category-2');
      expect(updated.yearMonth).toBe('2025-06');
      expect(updated.year).toBe(2025);
      expect(updated.type).toBe(TypeTransactionEnum.RECIPE);
      expect(updated.isPaid).toBe(false);
    });

    it('should keep the period when the date is not updated', () => {
      const created = service.create(makeCreateDTO());

      const updated = service.update(created.id.toValue(), {
        value: 10,
      } as UpdateTransactionsDTO);

      expect(updated.yearMonth).toBe('2026-03');
    });
  });

  describe('delete', () => {
    it('should remove the transaction and throw on the next find', () => {
      const created = service.create(makeCreateDTO());

      const deleted = service.delete(created.id.toValue());

      expect(deleted.id.toValue()).toBe(created.id.toValue());
      expect(() => service.find(created.id.toValue())).toThrow(
        NotFoundException,
      );
    });
  });
});

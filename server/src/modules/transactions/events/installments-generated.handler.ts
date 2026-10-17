import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { addMonths } from 'date-fns';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { InstallmentsGeneratedEvent } from '../../../domain/events/transaction/installments-generated.event';

@EventsHandler(InstallmentsGeneratedEvent)
export class InstallmentsGeneratedHandler implements IEventHandler<InstallmentsGeneratedEvent> {
  // TODO: substituir por repositório DDD (TypeORM) quando a migração for concluída
  private readonly transactionRepo: Transaction[] = [];

  async handle(event: InstallmentsGeneratedEvent) {
    const {
      userId,
      value,
      date,
      finalInstallment,
      currentInstallment,
      category,
      card,
      description,
      type,
      expenseType,
      originCreate,
    } = event.payload;

    const transactions: Transaction[] = [];

    // Cada parcela seguinte vence um mês após a anterior
    for (let i = 1; i <= finalInstallment - currentInstallment; i++) {
      const installment = Transaction.create({
        userId,
        value,
        type,
        category,
        card,
        description,
        date: addMonths(date, i),
        isPaid: false,
        expenseType,
        originCreate,
        isInstallment: true,
        currentInstallment: currentInstallment + i,
        finalInstallment,
      });

      transactions.push(installment);
    }

    this.transactionRepo.push(...transactions);
  }
}

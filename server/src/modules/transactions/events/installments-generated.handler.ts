import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { InstallmentsGeneratedEvent } from 'src/domain/events/transaction/installlments-generated.event';

@EventsHandler(InstallmentsGeneratedEvent)
export class InstallmentsGeneratedHandler implements IEventHandler<InstallmentsGeneratedEvent> {
  constructor(private readonly transactionRepo: Transaction[]) {
    this.transactionRepo = [];
  }

  async handle(event: InstallmentsGeneratedEvent) {
    const {
      value,
      date,
      finalInstallment,
      currentInstallment,
      category,
      card,
      description,
      type,
      expenseType,
    } = event.payload;

    const transactions: Transaction[] = [];

    for (let i = 1; i <= finalInstallment - currentInstallment; i++) {
      const installmentDate = new Date();

      const installment = Transaction.create({
        value,
        type,
        category,
        card,
        description,
        date: installmentDate,
        isPaid: false,
        expenseType,
        originCreate: 'app',
        isInstallment: true,
        currentInstallment: currentInstallment + i,
        finalInstallment,
        year: installmentDate.getFullYear().toString(),
        monthYear: `${String(installmentDate.getMonth() + 1).padStart(2, '0')}-${installmentDate.getFullYear()}`,
      });

      transactions.push(installment);
    }

    this.transactionRepo.push(...transactions);
    console.log(this.transactionRepo);
  }
}

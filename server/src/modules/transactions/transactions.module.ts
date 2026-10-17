import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { InstallmentsGeneratedHandler } from './events/installments-generated.handler';

@Module({
  imports: [],
  controllers: [TransactionsController],
  // O handler precisa estar registrado para o EventBus do CQRS encontrá-lo
  providers: [TransactionsService, InstallmentsGeneratedHandler],
  exports: [TransactionsService],
})
export class TransactionsModule {}

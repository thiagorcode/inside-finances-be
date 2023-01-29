import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryTransactionMonth } from './entities/summaryTransactionMonth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SummaryTransactionMonth])],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}

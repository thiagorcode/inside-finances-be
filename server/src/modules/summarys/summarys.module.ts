import { Module } from '@nestjs/common';
import { SummarysService } from './summarys.service';
import { SummarysController } from './summarys.controller';

@Module({
  controllers: [SummarysController],
  providers: [SummarysService]
})
export class SummarysModule {}

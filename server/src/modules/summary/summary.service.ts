import { Repository } from 'typeorm';
import { SummaryTransactionMonth } from './entities/summaryTransactionMonth.entity';
import { Injectable } from '@nestjs/common';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(SummaryTransactionMonth)
    private readonly summaryTransactionMonthRepository: Repository<SummaryTransactionMonth>,
  ) {}

  findByUser(userId: string) {
    return this.summaryTransactionMonthRepository.find({
      where: { userId },
    });
  }

  update(id: number, updateSummaryDto: UpdateSummaryDto) {
    return `This action updates a #${id} summary`;
  }
}

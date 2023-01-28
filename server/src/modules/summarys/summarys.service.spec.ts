import { Test, TestingModule } from '@nestjs/testing';
import { SummarysService } from './summarys.service';

describe('SummarysService', () => {
  let service: SummarysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummarysService],
    }).compile();

    service = module.get<SummarysService>(SummarysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

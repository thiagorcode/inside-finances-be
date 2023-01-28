import { Test, TestingModule } from '@nestjs/testing';
import { SummarysController } from './summarys.controller';
import { SummarysService } from './summarys.service';

describe('SummarysController', () => {
  let controller: SummarysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummarysController],
      providers: [SummarysService],
    }).compile();

    controller = module.get<SummarysController>(SummarysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

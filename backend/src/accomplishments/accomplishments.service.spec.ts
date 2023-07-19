import { Test, TestingModule } from '@nestjs/testing';
import { AccomplishmentsService } from './accomplishments.service';

describe('AccomplishmentsService', () => {
  let service: AccomplishmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccomplishmentsService],
    }).compile();

    service = module.get<AccomplishmentsService>(AccomplishmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

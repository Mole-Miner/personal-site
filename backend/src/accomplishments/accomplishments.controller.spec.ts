import { Test, TestingModule } from '@nestjs/testing';
import { AccomplishmentsController } from './accomplishments.controller';

describe('AccomplishmentsController', () => {
  let controller: AccomplishmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccomplishmentsController],
    }).compile();

    controller = module.get<AccomplishmentsController>(
      AccomplishmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

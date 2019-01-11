import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';

describe('Payments Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PaymentsController = module.get<PaymentsController>(PaymentsController);
    expect(controller).toBeDefined();
  });
});

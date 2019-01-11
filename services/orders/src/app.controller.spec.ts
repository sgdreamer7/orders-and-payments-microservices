import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('root', () => {
    it('should return "This is the \"orders\" microservice!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.root()).toBe('This is the "orders" microservice!');
    });
  });
});

import { Module } from '@nestjs/common';
import { PaymentsController } from './payments/payments.controller';

@Module({
  imports: [],
  controllers: [PaymentsController],
  providers: []
})
export class AppModule {}

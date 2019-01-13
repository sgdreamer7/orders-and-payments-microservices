import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PaymentsService } from '../payments/payments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [OrderService, PaymentsService],
  exports: [OrderService],
  controllers: [OrderController],
})
export class OrderModule { }

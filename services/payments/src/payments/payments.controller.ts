import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  @MessagePattern({ type: 'process-order-payment' })
  public async processOrderPayment(order: {}): Promise<boolean> {
    const isConfirmed = Math.random() >= 0.5;
    return Promise.resolve(isConfirmed);
  }
}

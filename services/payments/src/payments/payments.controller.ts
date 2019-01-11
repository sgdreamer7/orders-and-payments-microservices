import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  @MessagePattern({ type: 'dummy-message' })
  public async dummyFunction(): Promise<{}[]> {
    return [
      {
        dummy: 'value'
      }
    ];
  }
}

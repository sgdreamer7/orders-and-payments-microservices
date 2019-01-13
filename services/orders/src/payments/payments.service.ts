import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Order } from 'order/order.entity';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

@Injectable()
export class PaymentsService {
  @Client({
    transport: Transport.REDIS,
    options: { url: `redis://${REDIS_HOST}:${REDIS_PORT}` }
  })
  client: ClientProxy;

  public async processPayments(order: Order): Promise<boolean> {
    const response = await this.client.send<boolean>(
      { type: 'process-order-payment' },
      order
    );
    return response.toPromise();
  }
}

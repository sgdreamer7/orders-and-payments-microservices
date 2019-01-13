import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';

import { BaseService } from 'common/interfaces/base-service.interface';
import { Order } from 'order/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderState } from 'common/enums/order-state.enum';
import { PaymentsService } from 'payments/payments.service';
import { DELAY_FOR_DELIVERY } from 'config';

@Injectable()
export class OrderService implements BaseService<Order, CreateOrderDto, UpdateOrderDto> {
  constructor(
    private readonly paymentsService: PaymentsService,
    @InjectRepository(Order) private readonly OrderRepository: Repository<Order>
    ) {}

  async removeById(id: string | number): Promise<DeleteResult> {
    return this.OrderRepository.delete(id);
  }

  async findByName(name: string) {
    return undefined;
  }

  async updateById(id: string | number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.OrderRepository.update(id, updateOrderDto);
    return this.OrderRepository.findOne(id);
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = { ...new Order(), ...createOrderDto, state: OrderState.CREATED };
    const createdOrder = await this.OrderRepository.save(order);
    setTimeout( () => {
      this.processPayments(createdOrder)
      .then( processedOrder => this.deliver(processedOrder));
    }, 0);
    return createdOrder;
  }

  async findById(id: number | string): Promise<Order> {
    return this.OrderRepository.findOne(id);
  }

  async findAll(): Promise<Order[]> {
    return this.OrderRepository.find();
  }

  async findByPayload(payload: object) {
    return this.OrderRepository.findOne({ payload });
  }

  async cancelById(id: string | number): Promise<Order> {
    const order = await this.OrderRepository.findOne(id);
    if (order && order.state !== OrderState.DELIVERED) await this.OrderRepository.update(id, {state: OrderState.CANCELLED});
    return this.OrderRepository.findOne(id);
  }

  async processPayments(order: Order): Promise<Order> {
    if (order && order.state === OrderState.CREATED) {
      const isConfirmed = await this.paymentsService.processPayments(order);
      await this.OrderRepository.update(order.id, {state: isConfirmed ? OrderState.CONFIRMED : OrderState.CANCELLED});
      return this.OrderRepository.findOne(order.id);
    }
    return order;
  }

  async deliver(order: Order): Promise<Order> {
    return new Promise(async ( resolve ) => {
      const orderRepository = this.OrderRepository;
      if (order && order.state === OrderState.CONFIRMED) {
        setTimeout(async () => {
          await orderRepository.update(order.id, {state: OrderState.DELIVERED});
          resolve(this.OrderRepository.findOne(order.id));
        }, DELAY_FOR_DELIVERY);
      } else {
        resolve(order);
      }
    });
  }
}

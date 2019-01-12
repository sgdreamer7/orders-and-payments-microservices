import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';

import { BaseService } from 'common/interfaces/base-service.interface';
import { Order } from 'order/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderState } from 'common/enums/order-state.enum';

@Injectable()
export class OrderService implements BaseService<Order, CreateOrderDto, UpdateOrderDto> {
  constructor(@InjectRepository(Order) private readonly OrderRepository: Repository<Order>) {
  }

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
    return this.OrderRepository.save(order);
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
}

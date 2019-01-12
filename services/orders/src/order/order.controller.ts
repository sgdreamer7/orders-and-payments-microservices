import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';

import { OrderService } from 'order/order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from 'order/order.entity';
import { ResponseOrderDto } from './dto/response-order.dto';
import { OrderState } from 'common/enums/order-state.enum';

@Controller('orders')
@ApiUseTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @ApiOperation({ title: 'Create new order' })
  @ApiResponse({ status: 200, type: ResponseOrderDto })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Cancel order by id' })
  @ApiResponse({ status: 204, description: 'Successfully deleted Order' })
  @ApiImplicitParam({name: 'id', description: 'Order id', required: true, type: 1})
  async cancel(@Param('id') id: number | string): Promise<Order> {
    return this.orderService.cancelById(id);
  }

  @Get(':id')
  @ApiOperation({ title: 'Get order by id' })
  @ApiResponse({ status: 200, type: ResponseOrderDto })
  @ApiImplicitParam({name: 'id', description: 'Order id', required: true, type: 1})
  async fetchById(@Param('id') id: number | string): Promise<Order> {
    return this.orderService.findById(id);
  }

  @Get(':id/status')
  @ApiOperation({ title: 'Get status for order by id' })
  @ApiResponse({ status: 200, type: OrderState })
  @ApiImplicitParam({name: 'id', description: 'Order id', required: true, type: 1})
  async statusById(@Param('id') id: number | string): Promise<string> {
    return this.orderService.findById(id)
      .then( order => {
        if (order) return order.state;
        return OrderState.NOT_FOUND;
      } );
  }

  @Get()
  @ApiOperation({ title: 'Get all orders' })
  @ApiResponse({ status: 200, type: ResponseOrderDto, isArray: true })
  async fetchAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

}

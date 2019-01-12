import {  ApiModelProperty } from '@nestjs/swagger';
import { OrderPayload } from './order-payload.dto';

export class CreateOrderDto {
  @ApiModelProperty() readonly payload: OrderPayload;
}

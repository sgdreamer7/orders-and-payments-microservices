import {  ApiModelProperty } from '@nestjs/swagger';
import { OrderPayload } from './order-payload.dto';
import { OrderState } from 'common/enums/order-state.enum';

export class UpdateOrderDto {
  @ApiModelProperty() readonly payload: OrderPayload;
  @ApiModelProperty() readonly state: OrderState;
}

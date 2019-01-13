import { ApiModelProperty } from '@nestjs/swagger';
import { OrderPayload } from './order-payload.dto';
import { OrderState } from '../../common/enums/order-state.enum';

export class ResponseOrderDto {
  @ApiModelProperty({ example: 1 })
  readonly id: number;

  @ApiModelProperty({ example: '2018-10-18T12:41:40.423Z' })
  readonly createdAt: Date;

  @ApiModelProperty({ example: '2018-10-18T12:41:40.423Z' })
  readonly updatedAt: Date;

  @ApiModelProperty()
  readonly payload: OrderPayload;

  @ApiModelProperty({ example: `'${OrderState.CREATED}' | '${OrderState.CONFIRMED}' | '${OrderState.CANCELLED}' | '${OrderState.DELIVERED}'`})
  readonly state: string;
}

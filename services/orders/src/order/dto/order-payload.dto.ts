import {  ApiModelProperty } from '@nestjs/swagger';

export class OrderPayload {
  @ApiModelProperty({ example: 'AR12345' }) readonly article: string;
  @ApiModelProperty({ example: 1 }) readonly quantity: number;
  @ApiModelProperty({ example: 2.34 }) readonly price: number;
  @ApiModelProperty({ example: '' }) readonly options: string;
}
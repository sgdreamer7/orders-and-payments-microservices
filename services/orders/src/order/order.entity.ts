import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ type: 'json' })
  payload: {
    article: string,
    quantity: number,
    price: number,
    options: string,
  };

  @Column()
  state: string;

}
import { Order } from './order.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'userstatus',
})
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '', unique: true })
  statusname: string;

  @OneToMany(type => Order, order => order.status)
  orders: Promise<Order[]>;
}

import { Watchlist } from './watchlist.entity';
import { Order } from './order.entity';
import { Industry } from './industry.entity';
import { Price } from './prices.entity';
import { User } from './user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity({
  name: 'companies',
})
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '', unique: true })
  name: string;

  @Column({ default: '' })
  abbr: string;

  @Column({ default: '' })
  icon: string;

  @Column({ default: '' })
  ceo: string;

  @Column({ default: '' })
  address: string;

  @Column()
  closedate: Date;

  @ManyToOne(type => Industry, industry => industry.company, { eager: true })
  industry: Industry;

  @OneToMany(type => Price, price => price.company)
  prices: Promise<Price[]>;

  @OneToMany(type => Order, order => order.company)
  orders: Promise<Order[]>;

  @ManyToMany(type => Watchlist, watchlist => watchlist.companies)
  watchlists: Promise<Watchlist[]>;
}

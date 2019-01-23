import { Manager } from './managers.entity';
import { Funds } from './funds.entity';
import { Settings } from './settings.entity';
import { Order } from './order.entity';
import { Watchlist } from './watchlist.entity';
import { Role } from './role.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Role, role => role.users, { eager: true })
  role: Role;

  @ManyToOne(type => Manager, manager => manager.client, { eager: true })
  manager: Manager;

  @OneToOne(type => Watchlist, watchlist => watchlist.client)
  @JoinColumn()
  watchlist: Promise<Watchlist>;

  @OneToOne(type => Settings, settings => settings.user)
  settings: Promise<Settings>;

  @OneToOne(type => Funds, funds => funds.client, { eager: true })
  @JoinColumn()
  funds: Funds;

  @Column({ default: '' })
  fullname: string;

  @Column()
  dateregistered: Date;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  password: string;

  @OneToMany(type => Order, order => order.client)
  orders: Promise<Order[]>;
}

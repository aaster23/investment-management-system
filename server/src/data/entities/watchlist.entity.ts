import { Company } from './company.entity';
import { User } from './user.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({
  name: 'watchlists',
})
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => User, user => user.watchlist)
  client: Promise<User>;

  @ManyToMany(type => Company, company => company.watchlists, { eager: true, cascade: true})
  @JoinTable()
  companies: Company[];
}

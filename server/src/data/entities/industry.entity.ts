import { Company } from './company.entity';
import { User } from './user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'industries',
})
export class Industry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '', unique: true })
  name: string;

  @OneToMany(type => Company, company => company.industry)
  company: Promise<Company[]>;
}

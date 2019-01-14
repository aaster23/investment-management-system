import { User } from './user.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';

@Entity({
  name: 'funds',
})
export class Funds {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => User, user  => user.funds)
    client: Promise<User>;

    @Column({ default: 0 })
    currentamount: number;
}

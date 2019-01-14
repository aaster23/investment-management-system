import { User } from './user.entity';
import { PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';

@Entity({
  name: 'settings',
})
export class Settings {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => User, user => user.settings)
    user: Promise<User>;
}

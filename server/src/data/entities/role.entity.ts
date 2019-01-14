import { User } from './user.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'roles',
})
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: '', unique: true })
    rolename: string;

    @OneToMany(type => User, user => user.role)
    users: Promise<User[]>;

}
import { User } from './user.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity({
    name: 'managers',
})
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Role, role => role.users, { eager: true })
    role: Role;

    @OneToMany(type => User, user => user.manager)
    client: Manager;

    @Column({ default: '' })
    fullname: string;

    @Column()
    dateregistered: Date;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
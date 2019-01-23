import { Manager } from './../../../data/entities/managers.entity';
import { GetUserByEmailDTO } from './../../../models/user/getUserByEmail.dto';
import { ClientRegisterDTO } from './../../../models/user/client-register.dto';
import { GetUserDTO } from '../../../models/user/get-user.dto';
import { UserLoginDTO } from '../../../models/user/user-login.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../data/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../../../interfaces/jwt-payload';
import { Role } from '../../../data/entities/role.entity';
import { Funds } from '../../../data/entities/funds.entity';
import { RegisterDTO } from '../../../models/user/register.dto';
import { IdDTO } from 'src/models/user/id.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Manager)
    private readonly managersRepository: Repository<Manager>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Funds)
    private readonly fundsRepository: Repository<Funds>,
  ) { }

  // ==> Only admin can register new client and managers profiles
  async createManager(manager: RegisterDTO): Promise<Manager> {
    const foundManager = await this.managersRepository.findOne({ email: manager.email });
    if (foundManager) {
      throw new BadRequestException('Email already exist');
    }

    try {
      const managerRole = await this.roleRepository.findOne({ rolename: 'manager' });
      const newManager = await this.managersRepository.create();

      newManager.fullname = manager.fullname;
      newManager.email = manager.email;
      newManager.password = manager.password = await bcrypt.hash(manager.password, 10);
      newManager.dateregistered = new Date();
      newManager.role = managerRole;

      return await this.managersRepository.save(newManager);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async createAdmin(admin: RegisterDTO): Promise<User> {
    const foundAdmin = await this.usersRepository.findOne({ email: admin.email });
    if (foundAdmin) {
      throw new BadRequestException('Email already exist');
    }
    try {
      const role = await this.roleRepository.findOne({ rolename: 'admin' });
      const newAdmin = await this.usersRepository.create();
      newAdmin.fullname = admin.fullname;
      newAdmin.email = admin.email;
      newAdmin.dateregistered = new Date();
      newAdmin.role = role;
      newAdmin.password = admin.password = await bcrypt.hash(admin.password, 10);
      return await this.usersRepository.save(newAdmin);

    } catch (error) {
      throw new BadRequestException();
    }
  }

  async createClient(managerId: string, client: ClientRegisterDTO): Promise<User> {
    const foundClient = await this.usersRepository.findOne({ email: client.email });
    if (foundClient) {
      throw new BadRequestException('Email already exist');
    }

    try {
      const role = await this.roleRepository.findOne({ rolename: 'client' });
      const manager = await this.managersRepository.findOne({ id: managerId });

      const funds = await this.fundsRepository.create();
      funds.currentamount = +client.amount;
      await this.fundsRepository.save(funds);

      const newClient = await this.usersRepository.create();
      newClient.fullname = client.fullname;
      newClient.email = client.email;
      newClient.dateregistered = new Date();
      newClient.role = role;
      newClient.manager = manager;
      newClient.funds = funds;

      return await this.usersRepository.save(newClient);
    } catch (error) {
      throw new BadRequestException('Client cannot be created');
    }
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    const userFound: any = await this.usersRepository.findOne({ where: { email: payload.email } });
    const userFound1: any = await this.managersRepository.findOne({ where: { email: payload.email } });
    return userFound || userFound1;
  }

  async signIn(user: UserLoginDTO): Promise<User | Manager> {
    const userFound: User = await this.usersRepository.findOne({ where: { email: user.email } });
    const userFound1: Manager = await this.managersRepository.findOne({ where: { email: user.email } });
    if (userFound) {
      const result = await bcrypt.compare(user.password, userFound.password);
      if (result) {
        return userFound;
      }
    } else {
      const result1 = await bcrypt.compare(user.password, userFound1.password);
      if (result1) {
        return userFound1;
      }
    }

    return null;
  }

  async getAll() {
    return this.usersRepository.find({});
  }

  async getManager(manager: GetUserByEmailDTO): Promise<Manager>{
    try {
      const foundManager = await this.managersRepository.findOneOrFail({ email: manager.email });
      return foundManager;
    } catch (error) {
      throw new BadRequestException('No such manager');
    }
  }
  async getUser(user: GetUserByEmailDTO): Promise<User> {
    try {
      const foundUser = await this.usersRepository.findOneOrFail({ email: user.email });
      return foundUser;
    } catch (error) {
      throw new BadRequestException('No such user');
    }
  }

  async getClients(id: IdDTO): Promise<{}> {
    try {
      const clients = await this.usersRepository.find({ where: { manager: id } });
      return clients;
    } catch (error) {
      throw new BadRequestException('No such user');
    }
  }

  // Need info on settings and how will it work
  async getUserSettings(id: string) {
    const user: User = await this.usersRepository.findOne({ id });
    return user.settings;
  }

  async getAllUsersSettings() {
    const users: User[] = await this.usersRepository.find({});
    return users;
  }

  async updateUserSettings(id: string, settings: any) {
    const user: User = await this.usersRepository.findOne({ id });
    user.settings = settings;
  }
}

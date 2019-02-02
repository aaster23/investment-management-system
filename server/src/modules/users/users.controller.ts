import { AddSubstractFundDTO } from './../../models/funds/add-substract-fund.dto';
import { AdminGuard } from '../../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Body, ValidationPipe, HttpException, Post, BadRequestException } from '@nestjs/common';
import { UsersService } from '../../common/core/services/users.service';
import { Roles } from 'src/common';
import { RegisterDTO } from 'src/models/user/register.dto';
import { ClientRegisterDTO } from 'src/models/user/client-register.dto';
import { GetUserByEmailDTO } from 'src/models/user/getUserByEmail.dto';
import { IdDTO } from 'src/models/user/id.dto';
import { FundsService } from 'src/common/core/services/funds.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly fundService: FundsService,
  ) { }

  @Post('/user')
  @Roles('manager')
  @UseGuards(AuthGuard(), AdminGuard)
  async getUser(@Body() user: GetUserByEmailDTO) {
    return await this.usersService.getUser(user);
  }
  @Post('/manager')
  async getManager(@Body() user: GetUserByEmailDTO) {
    return await this.usersService.getManager(user);
  }

  @Post('/client')
  @Roles('manager')
  @UseGuards(AuthGuard(), AdminGuard)
  async getClients(@Body() id: IdDTO) {
    try {
      return await this.usersService.getClients(id);
    } catch (error) {
      throw new BadRequestException('No clients found');
    }
  }

  @Get('/clients')
  async getUsers() {
    try {
      return await this.usersService.getUsersByRole('client');
    } catch (error) {
      throw new BadRequestException('No clients found');
    }
  }

  @Get('/managers')
  async getManagers() {
    try {
      return await this.usersService.getUsersByRole('manager');
    } catch (error) {
      throw new BadRequestException('No managers found');
    }
  }

  @Get('/admins')
  async getAdmins() {
    try {
      return await this.usersService.getUsersByRole('admin');
    } catch (error) {
      throw new BadRequestException('No admins found');
    }
  }

  @Post('/funds')
  async getFund(@Body() email: AddSubstractFundDTO) {
    try {
      const fund = +(await this.fundService.currentFund(email));
      return { fund };
    } catch (error) {
      throw new BadRequestException('No clients found');
    }
  }

  @Post('/funds/add')
  async addFund(@Body() body: AddSubstractFundDTO) {
    try {
      const fund = +(await this.fundService.addToFund(body));
      return { fund };
    } catch (error) {
      throw new BadRequestException('Fund not found');
    }
  }

  @Post('funds/substract')
  async substractFund(@Body() body: AddSubstractFundDTO) {
    try {
      const fund = +(await this.fundService.substractFund(body));
      return { fund };
    } catch (error) {
      throw new BadRequestException('Fund not found or not enough money');
    }
  }

  @Post('register/manager')
  @Roles('admin')
  @UseGuards(AuthGuard(), AdminGuard)
  async registerManager(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) manager: RegisterDTO) {
    try {
      await this.usersService.createManager(manager);
      return { message: 'Sucessfully created admin!' };
    } catch (error) {
      throw new HttpException('Manager is not created', 404);
    }
  }

  @Post('register/client')
  @Roles('admin')
  @UseGuards(AuthGuard(), AdminGuard)
  async registerClient(@Body() client: ClientRegisterDTO) {
    try {
      await this.usersService.createClient(client.managerId, client);
      return { message: 'Sucessfully created client!' };
    } catch (error) {
      throw new HttpException('Client is not created', 404);
    }
  }

  @Post('register/admin')
  @Roles('admin')
  @UseGuards(AuthGuard(), AdminGuard)
  async registerAdmin(@Body() admin: RegisterDTO) {
    try {
      await this.usersService.createAdmin(admin);
      return { message: 'Sucessfully created admin!' };
    } catch (error) {
      throw new HttpException('Admin is not created', 404);
    }
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard(), AdminGuard)
  all() {
    return this.usersService.getAll();
  }

  // @Get('/settings')
  // @Roles('admin')
  // @UseGuards(AuthGuard(), AdminGuard)
  // getUsersSettings() {
  //   return this.usersService.getAllUsersSettings();
  // }

  @Post('/assign-manager')
  @Roles('admin')
  @UseGuards(AuthGuard(), AdminGuard)
  assignManager(@Body() email: string) {
    try {
      return this.usersService.assignManager(email);
    } catch (error) {
      return error;
    }
  }

  @Post('/unassign-manager')
  @Roles('admin')
  @UseGuards(AuthGuard(), AdminGuard)
  unassignManager(@Body() email: string) {
    try {
      return this.usersService.unassignManager(email);
    } catch (error) {
      return error;
    }
  }

  @Post('/drop-manager')
  @Roles('admin')
  @UseGuards(AuthGuard(), AdminGuard)
  dropManager(@Body() email: string) {
    try {
      return this.usersService.dropManager(email);
    } catch (error) {
      return error;
    }
  }
}

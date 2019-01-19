import { ManagerGuardService } from './../../../../client/src/app/route-guard/manager.guard';
import { UserLoginDTO } from './../../models/user/user-login.dto';
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
  // @Roles('admin', 'manager')
  // @UseGuards(AuthGuard(), AdminGuard)
  async getUser(@Body() user: GetUserByEmailDTO) {
    return await this.usersService.getUser(user);
  }

  @Post('/clients')
  async getClients(@Body() id: IdDTO) {
    try {
      return await this.usersService.getClients(id);
    } catch (error) {
      throw new BadRequestException('No clients found');
    }
  }

  @Post('/funds')
  async getFund(@Body() id: IdDTO) {
    try {
      const fund = +(await this.fundService.currentFund(id));
      return { fund };
    } catch (error) {
      throw new BadRequestException('No clients found');
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
    console.log(client);
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
    console.log(admin);
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
}

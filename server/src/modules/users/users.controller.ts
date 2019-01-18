import { UserLoginDTO } from './../../models/user/user-login.dto';
import { AdminGuard } from '../../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Body, ValidationPipe, HttpException, Post } from '@nestjs/common';
import { UsersService } from '../../common/core/services/users.service';
import { Roles } from 'src/common';
import { RegisterDTO } from 'src/models/user/register.dto';
import { ClientRegisterDTO } from 'src/models/user/client-register.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get('/user')
  // @Roles('admin', 'manager')
  // @UseGuards(AuthGuard(), AdminGuard)
  getUser(@Body() user: UserLoginDTO) {
    return this.usersService.getUser(user);
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
      return 'Manager was successfully added!';
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
      return 'Sucessfully created client!';
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
      return 'Sucessfully created admin!';
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

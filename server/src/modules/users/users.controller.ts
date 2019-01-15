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
  async registerClient(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) client: ClientRegisterDTO) {
    try {
      await this.usersService.createClient(client.managerId, client);
      return 'Client was sccessfully added!';
    } catch (error) {
      throw new HttpException('Client is not created', 404);
    }
  }

  @Get()
  @Roles('admin', 'manager')
  @UseGuards(AuthGuard(), AdminGuard)
  all() {
    return this.usersService.getAll();
  }
}

import { UsersService } from './../../common/core/services/users.service';
import { AuthModule } from '../../auth/auth.module';
import { CoreModule } from '../../common/core/core.module';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

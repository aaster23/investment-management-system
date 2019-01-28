import { Module } from '@nestjs/common';
import { CoreModule } from 'src/common/core/core.module';
import { AuthModule } from 'src/auth/auth.module';
import { OrderController } from './orders.controler';
import { OrderService } from 'src/common/core/services/order.service';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

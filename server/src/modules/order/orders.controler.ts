
import { Controller, Post, Body, Get, UseGuards, BadRequestException } from '@nestjs/common';
import { Roles, RolesGuard } from 'src/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from 'src/common/core/services/order.service';
import { Order } from 'src/data/entities/order.entity';
import { OrderDTO } from 'src/models/order/order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly ordersService: OrderService) { }

    @Post('/create')
    // @Roles('admin', 'manager')
    // @UseGuards(AuthGuard(), RolesGuard)
    createOrder(@Body() orderBody: OrderDTO) {
        try {
            this.ordersService.createOrder(orderBody);
        } catch (error) {
            throw new BadRequestException('Order failed!');
        }
    }
}

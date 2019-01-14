import { Status } from './../../../data/entities/status.entity';
import { Company } from './../../../data/entities/company.entity';
import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/data/entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from '../../../data/entities/order.entity';
import { OrderDTO } from '../../../models/order/order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(User)
        private readonly userrRepository: Repository<User>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
    ) { }

    async createOrder(clientId: string, order: OrderDTO) {
        const foundUser: User = await this.userrRepository.findOne({ where: { id: clientId } });
        if (!foundUser) {
            throw new HttpException('Client not found!', HttpStatus.NOT_FOUND);
        }

        const foundCompany: Company = await this.companyRepository.findOneOrFail({ where: { id: order.companyId } });
        if (!foundCompany) {
            throw new HttpException('Company not found!', HttpStatus.NOT_FOUND);
        }

        const foundStatus = await this.statusRepository.findOne({ where: { statusname: 'opened' } });
        if (!foundStatus) {
            throw new HttpException('Status not found!', HttpStatus.NOT_FOUND);
        }

        const amountNeeded = order.buyPrice * order.units;
        if (amountNeeded > foundUser.funds.currentamount) {
            try {
                const createOrder: Order = await this.orderRepository.create();
                createOrder.opendate = order.openDate;
                createOrder.closedate = order.closeDate;
                createOrder.buyprice = order.buyPrice;
                createOrder.sellprice = order.sellPrice;
                createOrder.units = order.units;
                createOrder.client = Promise.resolve(foundUser);
                createOrder.status = foundStatus;
                createOrder.company = Promise.resolve(foundCompany);

                await this.orderRepository.save(createOrder);
            } catch (error) {
                throw new HttpException('Cannot create order', HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException('You are out of money', HttpStatus.BAD_REQUEST);
        }

    }

    async getOrdersAll() {
        try {
            const foundOrders = await this.orderRepository.find();
            return foundOrders;
        } catch (error) {
            throw new HttpException('Open orders not found!', HttpStatus.NOT_FOUND);
        }
    }

    async getOrdersByClient(id: string) {
        const foundOrder = await this.orderRepository.findOneOrFail({ where: { clientId: id } });

        if (!foundOrder) {
            throw new HttpException('Orders not found!', HttpStatus.NOT_FOUND);
        }

        return foundOrder;
    }

    async closeOrder(id: string) { }

    async getClosedOrders(id: string) {

        const foundStatus = await this.statusRepository.findOne({ where: { statusname: 'closed' } });
        const foundClosedOrders = await this.orderRepository.find({
            where: {
                clientId: id,
                status: foundStatus.id,
            },
        });

        if (!foundClosedOrders) {
            throw new HttpException('Closed orders not found!', HttpStatus.NOT_FOUND);
        }

        if (foundClosedOrders.length === 0) {
            throw new BadRequestException('Client has no closed orders');
        }
        return foundClosedOrders;
    }

    async getOpenOrders(id: string) {

        const foundStatus = await this.statusRepository.findOne({ where: { statusname: 'opened' } });
        const foundOpenOrders = await this.orderRepository.find({
            where: {
                clientId: id,
                status: foundStatus.id,
            },
        });

        if (!foundOpenOrders) {
            throw new HttpException('Open orders not found!', HttpStatus.NOT_FOUND);
        }
        if (foundOpenOrders.length === 0) {
            throw new BadRequestException('Client has no opened orders');
        }

        return foundOpenOrders;
    }

    async getOrdersInInterval(start: Date, end: Date) {
        const foundOrdersInInrerval = await this.orderRepository.find({
            where: {
                opendate: start,
                closedate: end,
            },
        });

        if (!foundOrdersInInrerval) {
            throw new HttpException('Orders in set interval not found!', HttpStatus.NOT_FOUND);
        }

        return foundOrdersInInrerval;
    }
}
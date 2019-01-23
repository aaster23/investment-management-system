import { Manager } from './../../data/entities/managers.entity';
import { UsersService } from '../core/services/users.service';
import { Funds } from './../../data/entities/funds.entity';
import { Status } from './../../data/entities/status.entity';
import { Company } from './../../data/entities/company.entity';
import { Watchlist } from './../../data/entities/watchlist.entity';
import { Role } from './../../data/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './../../data/entities/user.entity';
import { FileService } from './file.service';
import { Order } from '../../data/entities/order.entity';
import { OrderService } from './services/order.service';
import { CompaniesService } from './services/companies.service';
import { Industry } from '../../data/entities/industry.entity';
import { FundsService } from './services/funds.service';
import { Settings } from './../../data/entities/settings.entity';
import { Price } from './../../data/entities/prices.entity';
import { IndustriesService } from './services/industry.service';
import { WatchlistService } from './services/watchlist.service';
import { PricesService } from './services/prices.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company, Industry, Watchlist, Order, Status, Role, Funds, Settings, Price, Manager])],
  providers: [UsersService, FileService, CompaniesService, OrderService, WatchlistService, FundsService, IndustriesService, PricesService],
  exports: [UsersService, FileService, CompaniesService, OrderService, WatchlistService, FundsService, IndustriesService, PricesService],
})
export class CoreModule { }

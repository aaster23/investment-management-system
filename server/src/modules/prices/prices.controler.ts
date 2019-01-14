import { User } from '../../data/entities/user.entity';
import { Company } from '../../data/entities/company.entity';
import { Controller, Get, UseGuards, Param, Body, ValidationPipe } from '@nestjs/common';
import { Roles, RolesGuard } from 'src/common';
import { AuthGuard } from '@nestjs/passport';
import { PricesService } from 'src/common/core/services/prices.service';
import { Price } from 'src/data/entities/prices.entity';
import { PriceRequestDTO } from 'src/models/prices/price-request.dto';

@Controller()
export class PricesController {

    constructor(private readonly pricesService: PricesService) {}

    @Get('prices')
    @Roles('manager')
    @UseGuards(AuthGuard(), RolesGuard)
    async getLatestForAllCompanies(): Promise<Price[]> {
        return await this.pricesService.getLastPricePerCompany();
    }

    @Get('prices/company')
    @Roles('manager')
    @UseGuards(AuthGuard(), RolesGuard)
    async getPrices(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
      })) priceRequest: PriceRequestDTO): Promise<object> {

      return await this.pricesService.getCompanyPrices(priceRequest.id, priceRequest.lastN, priceRequest.startdate, priceRequest.enddate);
    }

}

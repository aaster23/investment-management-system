import { Controller, Get, UseGuards, Param, Body, ValidationPipe, BadRequestException, Post } from '@nestjs/common';
import { Roles, RolesGuard } from 'src/common';
import { AuthGuard } from '@nestjs/passport';
import { PricesService } from 'src/common/core/services/prices.service';
import { Price } from 'src/data/entities/prices.entity';
import { PriceRequestDTO } from 'src/models/prices/price-request.dto';

@Controller('prices')
export class PricesController {

    constructor(private readonly pricesService: PricesService) { }

    @Get()
    @Roles('manager')
    @UseGuards(AuthGuard(), RolesGuard)
    async getLatestForAllCompanies(): Promise<Price[]> {
        try {
            return await this.pricesService.getLastPricePerCompany();
        } catch (error) {
            throw new BadRequestException('No prices found');
        }
    }

    @Post('/last')
    @Roles('manager')
    @UseGuards(AuthGuard(), RolesGuard)
    async getLastPrice(@Body() id: string): Promise<Price> {
        try {
            return await this.pricesService.getLastPrice(id);
        } catch (error) {
            throw new BadRequestException('No price found');
        }
    }

    // @Get('/company')
    // @Roles('manager')
    // @UseGuards(AuthGuard(), RolesGuard)
    // async getPrices(@Body(new ValidationPipe({
    //     transform: true,
    //     whitelist: true,
    // })) priceRequest: PriceRequestDTO): Promise<object> {

    //     return await this.pricesService.getCompanyPrices(priceRequest.id, priceRequest.lastN, priceRequest.startdate, priceRequest.enddate);
    // }

}
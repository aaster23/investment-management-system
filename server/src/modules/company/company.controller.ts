import { CompaniesService } from './../../common/core/services/companies.service';
import { Controller, Get, BadRequestException, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from 'src/common';

@Controller('companies')
export class CompaniesControler {
    constructor(private companiesService: CompaniesService) {
    }

    @Post('/company')
    @Roles('manager')
    @UseGuards(AuthGuard(), RolesGuard)
    getCompany(@Body() abbr: string) {
        try {
            return this.companiesService.getCompany(abbr);
        } catch (error) {
            throw new BadRequestException('No copmany to show');
        }
    }

    // @Get()
    // getAll() {
    //     try {
    //         return this.companiesService.getAll();
    //     } catch (error) {
    //         throw new BadRequestException('No copmanies to show');
    //     }
    // }
}

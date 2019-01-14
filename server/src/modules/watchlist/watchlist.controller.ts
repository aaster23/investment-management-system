import { User } from '../../data/entities/user.entity';
import { Company } from '../../data/entities/company.entity';
import { WatchlistService } from '../../common/core/services/watchlist.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from 'src/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class WatchlistController {

    constructor(private readonly watchlistService: WatchlistService) {}

    @Get('watchlist')
    @Roles('manager')
    @UseGuards(AuthGuard(), RolesGuard)
    async getWatchlist(): Promise<Company[]> {
        // for testing purposes - this will be taken from the body
        const client = new User();
        client.id = 'c304d9aa-fc3e-4945-af93-1fa81a743b64';
        //
        return await this.watchlistService.getCompanies(client.id);
    }

    @Get('watchlist/addcompany')
    @Roles('manager')
    @UseGuards(AuthGuard(), RolesGuard)
    async addCompany(): Promise<object> {
        // for testing purposes
        const company1 = new Company();
        company1.id = 'newcompanyid';
        company1.name = 'newcompanyname';
        company1.closedate = new Date();
        //
        return await this.watchlistService.addCompany(company1);
    }

    @Get('watchlist/removecompany')
    @Roles('manager')
    @UseGuards(AuthGuard(), RolesGuard)
    async removeCompany(): Promise<object> {
        // for testing purposes - this will be taken from the body
        const company1 = new Company();
        company1.id = 'newcompanyid';
        company1.name = 'newcompanyname';
        company1.closedate = new Date();
        //
        return await this.watchlistService.removeCompany(company1.id);
    }

}

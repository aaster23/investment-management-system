import { Company } from '../../../data/entities/company.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { User } from '../../../data/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Watchlist } from '../../../data/entities/watchlist.entity';
@Injectable()
export class WatchlistService {

    private currentWatchlist: Watchlist;

    constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,
    )

    {}

    async getCompanies(clientID: string): Promise<Company[]> {

    const foundClient = await this.usersRepository.findOne({id: clientID});
    if (!foundClient){
            throw new HttpException('There is no such user', HttpStatus.NOT_FOUND);
    }

    const foundWatchlist = await this.watchlistRepository.findOne( { where: { client: foundClient}});
    if (!foundWatchlist){
        throw new HttpException('This client has no watchlist', HttpStatus.NOT_FOUND);
    }
    // saving watchlist companies until we update the watchlit route
    this.currentWatchlist =  foundWatchlist;

    return foundWatchlist.companies;
    }

    async addCompany(companyToAdd: Company): Promise<object> {
        try {
            const watchlistCompanies = await (this.currentWatchlist.companies);

            if (!watchlistCompanies) {
                throw new HttpException('Watchlist not defined', HttpStatus.NOT_FOUND);
            }

            for (const company of watchlistCompanies) {
                if (company.id === companyToAdd.id) {
                    throw new HttpException('Company already in watchlist', HttpStatus.NOT_ACCEPTABLE);
                }
            }
            // updating watchlist in service also in db
            watchlistCompanies.push(companyToAdd);
            await this.watchlistRepository.save(this.currentWatchlist);

            return { result: `${companyToAdd.name} has been added to watchlist!`};

        } catch (error) {
            throw new HttpException('Cannot add company', HttpStatus.BAD_REQUEST);
        }

    }

    async removeCompany(companyId: string): Promise<object>{
        try {
            const watchlistCompanies = await this.currentWatchlist.companies;
            const initialNumberOfCompanies = watchlistCompanies.length;

            for (const [index, company] of watchlistCompanies.entries()) {
                if (company.id === companyId) {
                    watchlistCompanies.splice(index, 1);
                    break;
                }
            }

            if (initialNumberOfCompanies === watchlistCompanies.length){
                throw new HttpException('Company not found in watchlist', HttpStatus.NOT_FOUND);
            }
            // updating watchlist in service also in db
            await this.watchlistRepository.save(this.currentWatchlist);

            return { result: `Company with id:${companyId} has been removed from watchlist!`};
        } catch (error) {
            throw new HttpException('Cannot remove company', HttpStatus.BAD_REQUEST);
        }

    }
}
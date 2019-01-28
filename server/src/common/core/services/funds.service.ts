import { User } from '../../../data/entities/user.entity';
import { Funds } from './../../../data/entities/funds.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FundDTO } from '../../../models/funds/fund.dto';
import { AddSubstractFundDTO } from '../../../models/funds/add-substract-fund.dto';

@Injectable()
export class FundsService {
    constructor(
        @InjectRepository(Funds)
        private readonly fundRepository: Repository<Funds>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    async createFund(fundDTO: FundDTO) {
        const foundUser: User = await this.userRepository.findOne({ id: fundDTO.client_id });
        if (!foundUser) {
            throw new HttpException('Client not found!', HttpStatus.NOT_FOUND);
        }

        const createFund: Funds = await this.fundRepository.create();
        createFund.currentamount = fundDTO.amount;

        await this.fundRepository.save(createFund);
        return await this.userRepository.update({ id: fundDTO.client_id }, { funds: createFund });
    }

    async addToFund(fundDTO: AddSubstractFundDTO) {
        const foundUser: User = await this.userRepository.findOne({ email: fundDTO.email });
        const fundID = foundUser.funds.id;
        const foundFund = +(foundUser.funds.currentamount);
        if (!foundFund && foundFund !== 0) {
            throw new HttpException('Fund not found!', HttpStatus.NOT_FOUND);
        }
        return await this.fundRepository.update({ id: fundID }, { currentamount: foundFund + fundDTO.amount });
    }
    async substractFund(fundDTO: AddSubstractFundDTO) {
        const foundUser: User = await this.userRepository.findOne({ email: fundDTO.email });
        const fundID = foundUser.funds.id;
        const foundFund = +(foundUser.funds.currentamount);
        if (!foundFund) {
            throw new HttpException('Fund not found!', HttpStatus.NOT_FOUND);
        }
        if (foundFund < fundDTO.amount) {
            throw new Error('Current amount is less than the amount you want to extract');
        }

        return await this.fundRepository.update({ id: fundID }, { currentamount: foundFund - fundDTO.amount });
    }

    async currentFund(client_id: AddSubstractFundDTO) {
        const clientFound = await this.userRepository.findOne({ where: { email: client_id.email } });

        if (!clientFound) {
            throw new HttpException('Client not found!', HttpStatus.NOT_FOUND);
        }

        return await clientFound.funds.currentamount;
    }
}
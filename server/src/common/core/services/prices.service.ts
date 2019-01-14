import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan } from 'typeorm';
import { Price } from 'src/data/entities/prices.entity';
import { Company } from 'src/data/entities/company.entity';

@Injectable()
export class PricesService {

  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
) { }

  async getCompanyPrices(id: string, lastN: number, startdate?: Date, enddate?: Date): Promise<Price[]> {
    const company = await this.companyRepository.findOne({ id });
    if (!company) {
      throw new HttpException('Company doesn\'t exist!', HttpStatus.NOT_FOUND);
    }

    if (lastN) {
      return await this.priceRepository.find({ where: { company }, order: { opendate: 'DESC' }, take: lastN });
    }
    if (startdate && enddate) {
      return await this.priceRepository.find({ opendate: Between (startdate, enddate), company: Promise.resolve(company)});
    }
    if (startdate && !enddate) {
      return await this.priceRepository.find({ opendate: MoreThan (startdate.valueOf() - 1), company: Promise.resolve(company)});
    }

    return [await this.priceRepository.findOne({ where: { company }, order: { opendate: 'DESC' } })];
  }

  async getLastPricePerCompany(): Promise<Price[]> {
    const companies = await this.companyRepository.find({});
    const result = [];

    for (const company of companies) {
      try {
        const price = await this.priceRepository.findOne({ where: { company }, order: { opendate: 'DESC' } });
        result.push(price);
      } catch (e) {
        // Log error if necessary
      }
    }

    return result;
  }

}
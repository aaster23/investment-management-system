import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan } from 'typeorm';
import { Price } from '../../../data/entities/prices.entity';
import { Company } from '../../../data/entities/company.entity';

@Injectable()
export class PricesService {

  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) { }

  async getCompanyPrices(abbr: string, lastN: number, startdate?: Date, enddate?: Date): Promise<any> {
    const company = await this.companyRepository.findOne({ where: { abbr } });
    if (!company) {
      throw new HttpException('Company doesn\'t exist!', HttpStatus.NOT_FOUND);
    }

    if (lastN) {
      return await this.priceRepository.find({ where: { company }, order: { opendate: 'DESC' }, take: lastN });
    }
    if (startdate && enddate) {
      return await this.priceRepository.find({ opendate: Between(startdate, enddate), company });
    }
    if (startdate && !enddate) {
      return await this.priceRepository.find({ opendate: MoreThan(startdate.valueOf() - 1), company });
    }
    if (!startdate && !enddate) {
      return await this.priceRepository.find({ company }).then((res) => {
          return res.map( stock =>  { return { date: stock.opendate,
            open: stock.startprice,
            close: stock.endprice,
            high: stock.highprice,
            low: stock.lowprice };
          });
      });
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
        throw new BadRequestException('Price not found');
      }
    }
    return result;
  }
  async getLastPrice(id: string): Promise<Price> {
    try {
      return await this.priceRepository.findOne({ where: { company: id }, order: { opendate: 'DESC' } });
    } catch (e) {
      throw new BadRequestException('Price not found');
    }
  }
}
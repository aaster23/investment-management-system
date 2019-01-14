import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Result } from 'range-parser';
import { Industry } from 'src/data/entities/industry.entity';
import { IndustryDTO } from 'src/models/industry/industry.dto';
import { IndustryUpdateDTO } from 'src/models/industry/industryUpdate.dto';
@Injectable()
export class IndustriesService {
  constructor(
    @InjectRepository(Industry)
    private readonly industryRepository: Repository<Industry>,
  ) {}

  async createIndustry(industryToAdd: IndustryDTO): Promise<Industry> {
    const industryFound = await this.industryRepository.findOne({
      where: { name: industryToAdd.name },
    });

    if (industryFound) {
      throw new HttpException(
        'Industry already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const industry: Industry = new Industry();
    industry.name = industryToAdd.name;

    await this.industryRepository.create(industry);
    const result = await this.industryRepository.save(industry);
    return result;
  }
  async updateIndustry(industryData: IndustryUpdateDTO): Promise<Industry> {
    const industryFound = await this.industryRepository.findOne({
      where: { id: industryData.id },
    });

    if (!industryFound) {
      throw new HttpException(
        'There is no industry with this ID in the database',
        HttpStatus.BAD_REQUEST,
      );
    }

    industryFound.name = industryData.name;

    const result = await this.industryRepository.save(industryFound);

    return result;
  }

  async getAllIndustries(): Promise<Industry[]> {
    const industries: Industry[] = await this.industryRepository.find({});

    if (!industries) {
      return [];
    }

    return industries;
  }
}

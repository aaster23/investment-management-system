import { Company } from './../../data/entities/company.entity';
import { CompaniesService } from './../../common/core/services/companies.service';

import { Controller, Get, BadRequestException } from '@nestjs/common';

@Controller('companies')
export class CompaniesControler {
    /**
     *
     */
    constructor(private companiesService: CompaniesService) {
    }

    @Get()
    getAll() {
        try {
            return this.companiesService.getAll();
        } catch (error) {
            throw new BadRequestException('No copmanies to show');
        }
    }
}

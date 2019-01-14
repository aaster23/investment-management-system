
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { IndustriesService } from 'src/common/core/services/industry.service';
import { Industry } from 'src/data/entities/industry.entity';
import { IndustryDTO } from 'src/models/industry/industry.dto';
import { IndustryUpdateDTO } from 'src/models/industry/industryUpdate.dto';
import { Roles, RolesGuard } from 'src/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('industry')
export class IndustryController {
  constructor(private readonly industryService: IndustriesService) {}
  @Get('')
  @Roles('admin', 'manager')
  @UseGuards(AuthGuard(), RolesGuard)
  getAllIndustries(): Promise<Industry[]> {
    return this.industryService.getAllIndustries();
  }
  @Post('add')
  @Roles('admin', 'manager')
  @UseGuards(AuthGuard(), RolesGuard)
  createIndustry(@Body() data: IndustryDTO): Promise<Industry> {
    return this.industryService.createIndustry(data);
  }

  @Post('update')
  @Roles('admin', 'manager')
  @UseGuards(AuthGuard(), RolesGuard)
  updateIndustry(@Body() industryData: IndustryUpdateDTO): Promise<Industry> {
    return this.industryService.updateIndustry(industryData);
  }
}

import { IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Industry } from '../../data/entities/industry.entity';

export class AddCompanyDTO {

  @IsString()
  name: string;

  @IsString()
  abbr: string;

  @Optional()
  @IsString()
  icon: string;

  @IsString()
  ceo: string;

  @IsString()
  address: string;

  @Optional()
  industry: Industry;

}

import { AuthModule } from './../../auth/auth.module';
import { CompaniesControler } from './company.controller';
import { CompaniesService } from './../../common/core/services/companies.service';
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/common/core/core.module';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [CompaniesControler],
  providers: [CompaniesService],
})
export class CompanyModule {}

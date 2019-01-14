import { Module } from '@nestjs/common';
import { CoreModule } from 'src/common/core/core.module';
import { AuthModule } from 'src/auth/auth.module';
import { IndustryController } from './industry.controler';
import { IndustriesService } from 'src/common/core/services/industry.service';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [IndustryController],
  providers: [IndustriesService],
})
export class IndustryModule {}

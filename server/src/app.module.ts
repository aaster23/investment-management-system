import { ConfigService } from './config/config.service';
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './common/core/core.module';
import { DatabaseModule } from './database/database.module';
import { UsersService } from './common/core/services/users.service';
import { IndustryModule } from './modules/industry/industry.modul';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { PricesModule } from './modules/prices/prices.modul';
@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AuthModule,
    DatabaseModule,
    CoreModule,
    DatabaseModule,
    IndustryModule,
    WatchlistModule,
    PricesModule,
  ],
  controllers: [],
  providers: [UsersService],
})
export class AppModule { }

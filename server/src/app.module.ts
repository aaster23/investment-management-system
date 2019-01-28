import { OrderModule } from './modules/order/orders.module';
import { CompanyModule } from './modules/company/company.module';
import { UsersModule } from './modules/users/users.module';
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './common/core/core.module';
import { DatabaseModule } from './database/database.module';
import { IndustryModule } from './modules/industry/industry.modul';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { PricesModule } from './modules/prices/prices.modul';
import { UsersService } from './common/core/services/users.service';
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
    UsersModule,
    CompanyModule,
    OrderModule,
  ],
  controllers: [],
  providers: [UsersService],
})
export class AppModule { }

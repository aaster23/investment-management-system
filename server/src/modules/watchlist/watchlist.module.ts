import { Module } from '@nestjs/common';
import { CoreModule } from 'src/common/core/core.module';
import { AuthModule } from 'src/auth/auth.module';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from '../../common/core/services/watchlist.service';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [WatchlistController],
  providers: [WatchlistService],
})
export class WatchlistModule {}

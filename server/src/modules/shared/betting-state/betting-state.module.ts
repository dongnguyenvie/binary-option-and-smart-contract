import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { BettingStateProvider } from './betting-state.provider';
import { BettingStateService } from './betting-state.service';

@Module({
  imports: [],
  controllers: [],
  providers: [BettingStateProvider, BettingStateService],
  exports: [BettingStateService],
})
export default class BettingStateModule {}

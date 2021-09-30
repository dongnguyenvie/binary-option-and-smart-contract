import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { BettingStateService } from './betting-state.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          store: redisStore,
          port: config.get('REDIS_PORT'),
          ...(config.get('REDIS_PASSWORD') || process.env.NODE_ENV !== 'production'
            ? { auth_pass: config.get('REDIS_PASSWORD') }
            : {}),
          ttl: null,
          db: 11,
        };
      },
    }),
  ],
  controllers: [],
  providers: [BettingStateService],
  exports: [BettingStateService],
})
export default class BettingStateModule {}

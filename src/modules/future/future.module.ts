import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DataFeedModule from '../data-feed/data-feed.module';
import { FutureGateway } from './gateways/future.gateway';
import FutureService from './services/future.service';
import * as redisStore from 'cache-manager-redis-store';
import TokenModule from '../shared/token/token.module';

@Module({
  imports: [
    TokenModule,
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
    DataFeedModule,
  ],
  controllers: [],
  providers: [FutureService, FutureGateway],
  exports: [],
})
export default class FutureModule {}

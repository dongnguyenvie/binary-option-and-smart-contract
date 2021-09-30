import { Module } from '@nestjs/common';
import DataFeedModule from '../data-feed/data-feed.module';
import FutureGateway from './gateways/future.gateway';
import FutureService from './services/future.service';
import SharedModule from '../shared/shared-module';
import { BullModule } from '@nestjs/bull';
import { BET_CALCULATOR } from './constants/future.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BetProcessor } from './processors/bet.processor';

@Module({
  imports: [
    SharedModule,
    DataFeedModule,
    BullModule.registerQueueAsync({
      name: BET_CALCULATOR,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          db: 1,
          ...(config.get('REDIS_PASSWORD') || process.env.NODE_ENV !== 'production'
            ? { password: config.get('REDIS_PASSWORD') }
            : {}),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [BetProcessor, FutureService, FutureGateway],
  exports: [],
})
export default class FutureModule {}

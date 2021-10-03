import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { MemoryCacheService } from './memory-cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          store: redisStore,
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          ...(config.get('REDIS_PASSWORD') || process.env.NODE_ENV !== 'production'
            ? { auth_pass: config.get('REDIS_PASSWORD') }
            : {}),
          ttl: null,
        };
      },
    }),
  ],
  providers: [MemoryCacheService],
  exports: [MemoryCacheService],
})
export default class MemoryCacheModule {}

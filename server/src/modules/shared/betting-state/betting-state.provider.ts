import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cacheManager from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { BETTING_PROVIDER } from './betting-state.constant';

export const BettingStateProvider: Provider = {
  useFactory: (config: ConfigService) => {
    return cacheManager.caching({
      store: redisStore,
      port: config.get('REDIS_PORT'),
      ...(config.get('REDIS_PASSWORD') || process.env.NODE_ENV !== 'production'
        ? { auth_pass: config.get('REDIS_PASSWORD') }
        : {}),
      ttl: null,
      db: 11,
    });
  },
  provide: BETTING_PROVIDER,
  inject: [ConfigService],
};

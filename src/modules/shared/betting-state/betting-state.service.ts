import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class BettingStateService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T = any>(key, defaultValue = undefined): Promise<T> {
    try {
      return (await this.cache.get(key)) || defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }

  async set<T = any>(key: string, value: T, ttl: number = undefined) {
    const option = getOption(ttl);
    try {
      await this.cache.set(key, value, option);
    } catch (error) {
      console.log('RedisCacheService error', error);
    }
  }

  async reset() {
    try {
      await this.cache.reset();
    } catch (error) {}
  }
}

export const getOption = (ttl) => {
  if (ttl) return { ttl };
  return undefined;
};

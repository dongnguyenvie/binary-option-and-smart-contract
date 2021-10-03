import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { BETTING_PROVIDER, PREFIX_REDIS, TTL } from './betting-state.constant';

@Injectable()
export class BettingStateService {
  constructor(@Inject(BETTING_PROVIDER) private readonly cache: Cache) {}

  async get<T = any>(key, defaultValue = undefined): Promise<T> {
    try {
      return (await this.cache.get(PREFIX_REDIS + key)) || defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }

  async set<T = any>(key: string, value: T, ttl = TTL) {
    const option = getOption(ttl);
    try {
      await this.cache.set(PREFIX_REDIS + key, value, option);
    } catch (error) {
      console.log('redis set has error', error);
    }
  }

  async reset() {
    try {
      await this.cache.reset();
    } catch (error) {}
  }

  async getAll() {
    try {
      const keys = await this.cache.store.keys(PREFIX_REDIS + '*');
      const values = await this.cache.store.mget(keys);
      return values;
    } catch (error) {
      return [];
    }
  }
}

export const getOption = (ttl) => {
  if (ttl) return { ttl };
  return undefined;
};

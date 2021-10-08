import { Injectable, Inject, CACHE_MANAGER, OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';
import WalletEntity from 'src/modules/wallet/entities/wallets.entity';
import { getOption } from './memory-cache.util';

const BETTOR_WALLET = 'BETTOR:';

@Injectable()
export class MemoryCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key, defaultValue = undefined) {
    try {
      return (await this.cache.get(key)) || defaultValue;
    } catch (error) {
      return defaultValue;
    }
  }

  async wrap(...keys: any[]) {
    try {
      return await this.cache.wrap<string>(...keys);
    } catch (error) {}
  }

  async set(key, value, ttl: number = undefined) {
    const option = getOption(ttl);
    try {
      await this.cache.set(key, value, option);
    } catch (error) {
      console.log('RedisCacheService error', error);
    }
  }

  async getWallet(key, defaultValue = undefined): Promise<WalletEntity> {
    const k = BETTOR_WALLET + key;
    return this.get(k, defaultValue);
  }

  async setWallet(key, value, ttl: number = undefined) {
    const k = BETTOR_WALLET + key;
    return this.set(k, value, ttl);
  }
}

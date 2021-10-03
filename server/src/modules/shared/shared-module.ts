import { Module } from '@nestjs/common';
import BettingStateModule from './betting-state/betting-state.module';
import MemoryCacheModule from './memory-cache/memory-cache.module';
import TokenModule from './token/token.module';

@Module({
  imports: [BettingStateModule, TokenModule, MemoryCacheModule],
  exports: [BettingStateModule, TokenModule, MemoryCacheModule],
})
export default class SharedModule {}

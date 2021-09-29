import { Module } from '@nestjs/common';
import BettingStateModule from './betting-state/betting-state.module';
import TokenModule from './token/token.module';

@Module({
  imports: [BettingStateModule, TokenModule],
  exports: [BettingStateModule, TokenModule],
})
export default class SharedModule {}

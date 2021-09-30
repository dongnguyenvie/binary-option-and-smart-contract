import { Module } from '@nestjs/common';
import binanceProvider from './providers/binance.provider';
import DataFeedService from './services/data-feed.service';

@Module({
  imports: [],
  providers: [binanceProvider, DataFeedService],
  exports: [binanceProvider, DataFeedService],
})
export default class DataFeedModule {}

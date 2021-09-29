import { Module } from '@nestjs/common';
import DataFeedModule from '../data-feed/data-feed.module';
import FutureGateway from './gateways/future.gateway';
import FutureService from './services/future.service';
import SharedModule from '../shared/shared-module';

@Module({
  imports: [SharedModule, DataFeedModule],
  controllers: [],
  providers: [FutureService, FutureGateway],
  exports: [],
})
export default class FutureModule {}

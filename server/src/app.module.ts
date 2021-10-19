import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppController from './app.controller';
import AuthModule from './modules/auth/auth.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import DataFeedModule from './modules/data-feed/data-feed.module';
import FutureModule from './modules/future/future.module';
import OrdersModule from './modules/orders/orders.module';
import UserModule from './modules/user/user.module';
import WalletModule from './modules/wallet/wallet.module';
import NftModule from './modules/nft/nft.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    TypeOrmModule.forRoot({
      charset: 'utf8mb4',
    }),
    UserModule,
    AuthModule,
    WalletModule,
    DataFeedModule,
    FutureModule,
    OrdersModule,
    BlockchainModule,
    NftModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppController from './app.controller';
import AuthModule from './modules/auth/auth.module';
import DataFeedModule from './modules/data-feed/data-feed.module';
import UserModule from './modules/user/user.module';
import WalletModule from './modules/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      charset: 'utf8mb4',
    }),
    UserModule,
    AuthModule,
    WalletModule,
    DataFeedModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

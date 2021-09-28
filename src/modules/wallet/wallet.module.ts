import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import WalletController from './controllers/wallet.controller';
import TransactionRepository from './repositories/transaction.repository';
import WalletRepository from './repositories/wallet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WalletRepository, TransactionRepository])],
  providers: [],
  controllers: [WalletController],
  exports: [],
})
export default class WalletModule {}

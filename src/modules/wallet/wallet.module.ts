import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import WalletController from './controllers/wallet.controller';
import TransactionRepository from './repositories/transaction.repository';
import WalletRepository from './repositories/wallet.repository';
import TransactionService from './servies/transaction.service';
import WalletService from './servies/wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([WalletRepository, TransactionRepository])],
  providers: [TransactionService, WalletService],
  controllers: [WalletController],
  exports: [],
})
export default class WalletModule {}

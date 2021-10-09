import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SharedModule from '../shared/shared-module';
import WalletController from './controllers/wallet.controller';
import TransactionRepository from './repositories/transaction.repository';
import WalletRepository from './repositories/wallet.repository';
import TransactionService from './servies/transaction.service';
import WalletService from './servies/wallet.service';
import TransactionSubscriber from './subscribers/transaction.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([WalletRepository, TransactionRepository]), SharedModule],
  providers: [TransactionSubscriber, TransactionService, WalletService],
  controllers: [WalletController],
  exports: [TransactionService, WalletService],
})
export default class WalletModule {}

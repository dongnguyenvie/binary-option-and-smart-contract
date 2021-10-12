import { Module } from '@nestjs/common';
import paymentProvider from './providers/payment.provider';
import { BlockChainPaymentService } from './services/blockchain-payment.service';

@Module({
  imports: [],
  providers: [paymentProvider, BlockChainPaymentService],
  controllers: [],
  exports: [],
})
export class BlockchainModule {}

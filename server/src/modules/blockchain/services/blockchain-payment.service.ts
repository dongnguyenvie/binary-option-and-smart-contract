import { Inject, Injectable } from '@nestjs/common';
import { BigNumber, ethers } from 'ethers';
import { EventEmitter2 } from 'eventemitter2';
import { transactionEvent } from 'src/modules/shared/constants/event.constant';
import CreateDepositTransactionEvent from 'src/modules/shared/events/create-deposit-transaction.event';
import { PAYMENT_CONTRACT } from '../constants/blockchain.constant';

@Injectable()
export class BlockChainPaymentService {
  constructor(
    @Inject(PAYMENT_CONTRACT) paymentContract: ethers.Contract,
    private eventEmitter: EventEmitter2,
  ) {
    paymentContract.on(
      'PaymentDone',
      (payer, amount: ethers.BigNumber, userId, date: ethers.BigNumber, transaction) => {
        const payload = new CreateDepositTransactionEvent({
          userId: userId,
          timestamp: date.toString(),
          amount: +ethers.utils.formatUnits(amount),
          tx: transaction.transactionHash,
          address: payer,
        });
        this.eventEmitter.emit(transactionEvent.CREATE_DEPOSIT_TRANSACTION, payload);
      },
    );
  }
}

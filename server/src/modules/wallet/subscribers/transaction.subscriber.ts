import { EventEmitter2 } from 'eventemitter2';

import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { TransactionStatus } from '../constants/transaction.constant';
import TransactionEntity from '../entities/transactions.entity';
import TransactionRepository from '../repositories/transaction.repository';
import WalletRepository from '../repositories/wallet.repository';

@EventSubscriber()
export default class TransactionSubscriber implements EntitySubscriberInterface<TransactionEntity> {
  constructor(
    private connection: Connection,
    private walletRepo: WalletRepository,
    private transactionRepo: TransactionRepository,
    private eventEmitter: EventEmitter2,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return TransactionEntity;
  }

  async afterInsert(event: InsertEvent<TransactionEntity>) {
    const transaction = event.entity;
    console.log('transaction:', transaction);
    this.connection.transaction(async (manager) => {
      const wallet = await this.walletRepo.findOne(
        {
          id: transaction.walletId,
        },
        { select: ['id', 'balance'] },
      );
      if (!wallet) {
        throw 'Wallet is not found';
      }
      this.walletRepo.merge(wallet, {
        balance: +wallet.balance + +transaction.credit - transaction.debit,
      });

      this.transactionRepo.merge(transaction, {
        status: TransactionStatus.FINISHED,
      });
      await manager.save(wallet);
      await manager.save(transaction);
    });
  }
}

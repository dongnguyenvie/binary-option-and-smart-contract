import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { TransactionType } from 'src/modules/shared/constants/common.contant';
import { transactionEvent } from 'src/modules/shared/constants/event.constant';
import { TransactionStatus } from '../constants/transaction.constant';
import { CreateDepositTransaction, CreateTransaction } from '../interfaces/transaction.interface';
import TransactionRepository from '../repositories/transaction.repository';
import WalletRepository from '../repositories/wallet.repository';

@Injectable()
export default class TransactionService {
  constructor(
    private transactionRepo: TransactionRepository,
    private walletRepo: WalletRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async createTransaction(payload: CreateTransaction, type: TransactionType) {
    const wallet = payload.wallet;
    const transaction = this.transactionRepo.create({
      userId: wallet.userId,
      walletId: wallet.id,
      credit: payload.credit,
      debit: payload.debit,
      description: payload.description,
      status: TransactionStatus.PROCESSING,
      type: type,
    });
    // if (type === TransactionType.BETTING) {
    //   this.transactionRepo.merge(transaction, { orderId: payload.orderId });
    // }
    const results = await this.transactionRepo.save(transaction);
    return results;
  }

  async createDepositTransaction(payload: CreateDepositTransaction) {
    const wallet = await this.walletRepo.findOne({ id: payload.walletId }, { select: ['userId', 'id'] });
    if (!wallet) {
      return new NotFoundException('Wallet is notfound');
    }
    return this.createTransaction(
      {
        ...payload,
        wallet,
      },
      TransactionType.DEPOSIT,
    );
  }

  async createWithrawTransaction(payload: CreateDepositTransaction) {
    const wallet = await this.walletRepo.findOne({ id: payload.walletId }, { select: ['userId', 'id'] });
    if (!wallet) {
      return new NotFoundException('Wallet is notfound');
    }
    return this.createTransaction(
      {
        ...payload,
        wallet,
      },
      TransactionType.WITHDRAW,
    );
  }

  @OnEvent(transactionEvent.CREATE_BET_TRANSACTION)
  handleCreateBetTransactionEvent(payload: any) {
    console.log('payload create order', payload);
  }
}

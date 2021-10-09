import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { TransactionType } from 'src/modules/shared/constants/common.contant';
import { transactionEvent } from 'src/modules/shared/constants/event.constant';
import CreateBetTransactionEvent from 'src/modules/shared/events/create-bet-transaction.event';
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

  async createBetTransaction(payload: any) {
    const transaction = this.transactionRepo.create({
      userId: payload.userId,
      walletId: payload.walletId,
      orderId: payload.orderId,
      credit: payload?.credit || 0,
      debit: payload?.debit || 0,
      description: payload?.description || '',
      status: TransactionStatus.PROCESSING,
      ...(payload.profit > 0 ? { credit: payload.profit } : { debit: Math.abs(payload.profit) }),
      type: TransactionType.BETTING,
    });

    const results = await this.transactionRepo.save(transaction);
    return results;
  }

  @OnEvent(transactionEvent.CREATE_BET_TRANSACTION)
  createBetTransactionEventListener(payload: CreateBetTransactionEvent) {
    this.createBetTransaction(payload);
  }
}

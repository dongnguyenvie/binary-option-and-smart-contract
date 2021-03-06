import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { TransactionType } from 'src/modules/shared/constants/common.contant';
import { transactionEvent } from 'src/modules/shared/constants/event.constant';
import CreateBetTransactionEvent from 'src/modules/shared/events/create-bet-transaction.event';
import CreateDepositTransactionEvent from 'src/modules/shared/events/create-deposit-transaction.event';
import { TransactionStatus } from '../constants/transaction.constant';
import {
  CreateDepositTransaction,
  CreateTransaction,
  CreateWithrawTransaction,
} from '../interfaces/transaction.interface';
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
      tx: payload.tx || undefined,
      type: type,
    });
    // if (type === TransactionType.BETTING) {
    //   this.transactionRepo.merge(transaction, { orderId: payload.orderId });
    // }
    const results = await this.transactionRepo.save(transaction);
    return results;
  }

  async createDepositTransaction(payload: CreateDepositTransaction) {
    const wallet = await this.walletRepo.findOne({ userId: payload.userId }, { select: ['userId', 'id'] });
    if (!wallet) {
      return new NotFoundException('Wallet is notfound');
    }
    return this.createTransaction(
      {
        ...payload,
        wallet,
        tx: payload.tx,
      },
      TransactionType.DEPOSIT,
    );
  }

  async createWithrawTransaction(payload: CreateWithrawTransaction) {
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

  async isSolved(tx: string) {
    const result = await this.transactionRepo.findOne({ tx: tx });
    return result;
  }

  @OnEvent(transactionEvent.CREATE_BET_TRANSACTION)
  createBetTransactionEventListener(payload: CreateBetTransactionEvent) {
    this.createBetTransaction(payload);
  }

  @OnEvent(transactionEvent.CREATE_DEPOSIT_TRANSACTION)
  async createDepositTransactionListener(payload: CreateDepositTransactionEvent) {
    const isSolved = await this.isSolved(payload.tx);
    if (!!isSolved) return;
    const description = JSON.stringify({
      tx: payload.tx,
      t: payload.timestamp,
      addr: payload.address,
    });
    const USD_RADIO = 1 * 100000;
    const credit = USD_RADIO * payload.amount;

    this.createDepositTransaction({
      credit,
      debit: 0,
      description,
      userId: payload.userId,
      tx: payload.tx,
    });
  }
}

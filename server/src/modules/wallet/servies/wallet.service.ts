import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WalletStatus } from 'src/modules/shared/constants/common.contant';
import { walletEvent } from 'src/modules/shared/constants/event.constant';
import CreateWalletEvent from 'src/modules/shared/events/create-wallet.event';
import SyncWalletToMemoryEvent from 'src/modules/shared/events/sync-wallet-to-memory-event';
import { CurrentUser } from 'src/modules/shared/interfaces/common.interface';
import { MemoryCacheService } from 'src/modules/shared/memory-cache/memory-cache.service';
import { CreateWallet, LockWallet } from '../interfaces/wallet.interface';
import TransactionRepository from '../repositories/transaction.repository';
import WalletRepository from '../repositories/wallet.repository';

@Injectable()
export default class WalletService {
  constructor(
    private transactionRepo: TransactionRepository,
    private walletRepo: WalletRepository,
    private cacheSvc: MemoryCacheService,
  ) {}

  async createWallet(payload: CreateWallet) {
    const wallet = this.walletRepo.create({
      userId: payload.userId,
      balance: 0,
      status: WalletStatus.ACTIVE,
    });
    const results = await this.walletRepo.save(wallet);
    return results;
  }

  async myWallet(user: CurrentUser) {
    try {
      const wallet = await this.walletRepo.findOne({
        userId: user.id,
      });
      if (!wallet) {
        return new NotFoundException('wallet is not found');
      }
      return wallet;
    } catch (error) {
      return new BadRequestException('Cannot get wallet');
    }
  }

  async lockWallet(payload: LockWallet) {
    try {
      const walletID = payload.id;
      const wallet = await this.walletRepo.update(walletID, { status: WalletStatus.LOCK });
      return wallet;
    } catch (error) {
      return new BadRequestException('Cannot lock the wallet');
    }
  }

  @OnEvent(walletEvent.SYNC_WALLET_TO_MEMORY)
  async syncWalletToMemoryListener(payload: SyncWalletToMemoryEvent) {
    const userId = payload.userId;
    const wallet = await this.walletRepo.findOne({ userId: userId });
    console.log('wallet', wallet);
    if (!wallet) return;
    this.cacheSvc.setWallet(userId, wallet, 86400);
  }

  @OnEvent(walletEvent.CREATE_WALLET)
  async createWalletListener(payload: CreateWalletEvent) {
    const userId = payload.userId;
    const wallet = await this.walletRepo.findOne({ userId: userId });
    if (!!wallet) return;
    this.createWallet({ userId: userId });
  }
}

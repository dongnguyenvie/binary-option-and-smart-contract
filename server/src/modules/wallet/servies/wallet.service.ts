import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { WalletStatus } from 'src/modules/shared/constants/common.contant';
import { CurrentUser } from 'src/modules/shared/interfaces/common.interface';
import { CreateWallet, LockWallet } from '../interfaces/wallet.interface';
import TransactionRepository from '../repositories/transaction.repository';
import WalletRepository from '../repositories/wallet.repository';

@Injectable()
export default class WalletService {
  constructor(private transactionRepo: TransactionRepository, private walletRepo: WalletRepository) {}

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
}

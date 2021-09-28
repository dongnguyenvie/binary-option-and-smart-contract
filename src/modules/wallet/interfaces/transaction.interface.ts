import WalletEntity from '../entities/wallets.entity';

export interface CreateTransaction {
  wallet: WalletEntity;

  orderId?: string;

  description: string;

  credit: number;

  debit: number;
}

export interface CreateOrderTransaction {
  userId: string;

  orderId: string;

  description: string;

  credit: number;

  debit: number;
}

export interface CreateDepositTransaction {
  walletId: string;

  description: string;

  credit: number;

  debit: number;
}

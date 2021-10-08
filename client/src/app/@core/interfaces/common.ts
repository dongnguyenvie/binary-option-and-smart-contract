export interface Profile {
  id: string;
  email: string;
  wallet: Wallet;
}

interface Wallet {
  id: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  balance: string;
  address?: any;
  totalDeposit: string;
  totalWithdraw: string;
  activeDate: string;
  userId: string;
  transactionIds: any[];
}

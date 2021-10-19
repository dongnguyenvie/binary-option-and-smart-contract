export interface Profile {
  id: string;
  email: string;
}

export interface Wallet {
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

export interface NFT {
  attributes: Attribute[];
  description: string;
  image: string;
  name: string;
  id: string;
}

interface Attribute {
  trait_type: string;
  value: string;
}

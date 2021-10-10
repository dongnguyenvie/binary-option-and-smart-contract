export interface CreateWallet {
  userId: string;
  address: string;
  otp: string;
}

export interface LockWallet {
  id: string;
}

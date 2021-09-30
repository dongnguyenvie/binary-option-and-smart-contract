export interface CurrentUser {
  email: string;
  wallet?: string;
  sub: string;
  id: string;
  scp: string[];
}

export interface Bettor {
  betType: number;
  amount: number;
  openTime: number;
  userId: string;
  orderId: string;
}

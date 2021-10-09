import { BetType, OrderStatus } from 'src/modules/shared/constants/common.contant';

export interface CreateOrderTransaction {
  id: string;
  userId: string;
  status: OrderStatus;
  betType: BetType;
  amount: number;
  asset: string;
}

export interface CreateOrder {
  // userId: string;
  betType: BetType;
  amount: number;
  asset: string;
}

export interface UpdateOrder {
  status: OrderStatus;
  profit: number;
  orderId: string;
}

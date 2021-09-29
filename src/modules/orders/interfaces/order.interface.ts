import { BetType } from 'src/modules/shared/constants/common.contant';
import { OrderStatus } from '../consttants/order.contstant';

export interface CreateOrderTransaction {
  id: string;
  userId: string;
  status: OrderStatus;
  betType: BetType;
  amount: number;
  asset: string;
}
export interface CreateOrder {
  userId: string;
  status: OrderStatus;
  betType: BetType;
  amount: number;
  asset: string;
  duration: number;
}

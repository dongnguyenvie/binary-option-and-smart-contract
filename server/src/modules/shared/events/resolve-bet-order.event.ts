import { BetResult, OrderStatus } from '../constants/common.contant';

export default class ResolveBetOrderEvent {
  public status: OrderStatus;
  public profit: number;
  public orderId: string;
  public userId: string;
  public walletId: string;

  constructor(partial: Partial<ResolveBetOrderEvent>) {
    Object.assign(this, partial);
  }
}

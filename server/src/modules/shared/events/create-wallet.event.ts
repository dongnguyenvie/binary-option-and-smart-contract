import { BetResult, OrderStatus } from '../constants/common.contant';

export default class CreateWalletEvent {
  public userId: string;

  constructor(partial: Partial<CreateWalletEvent>) {
    Object.assign(this, partial);
  }
}

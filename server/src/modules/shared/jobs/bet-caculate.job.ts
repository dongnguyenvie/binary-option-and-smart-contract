import { BetResult } from '../constants/common.contant';

export default class BetCalculateJob {
  public betType: number;
  public amount: number;
  public openTime: number;
  public userId: string;
  public orderId: string;
  public betResult: BetResult;

  constructor(partial: Partial<BetCalculateJob>) {
    Object.assign(this, partial);
  }
}

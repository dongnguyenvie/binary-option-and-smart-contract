import { BetResult } from '../constants/common.contant';

export default class BetCalculateJob {
  public betType: number;
  public amount: number;
  public openTime: number;
  public userId: string;
  public orderId: string;
  public bestResult: BetResult;

  constructor(partical: Partial<BetCalculateJob>) {
    Object.assign(this, partical);
  }
}

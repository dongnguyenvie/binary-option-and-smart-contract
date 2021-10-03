import { BetResult } from '../constants/common.contant';

export default class BetResultEvent {
  public userId: string;
  public profit: number;
  public betResult: BetResult;

  constructor(partial: Partial<BetResultEvent>) {
    Object.assign(this, partial);
  }
}

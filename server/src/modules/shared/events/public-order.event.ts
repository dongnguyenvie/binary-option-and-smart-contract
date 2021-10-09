import { BetType } from '../constants/common.contant';

export default class PublicOrderEvent {
  public username: string;
  public amount: number;
  public betType: BetType;

  constructor(partial: Partial<PublicOrderEvent>) {
    Object.assign(this, partial);
  }
}

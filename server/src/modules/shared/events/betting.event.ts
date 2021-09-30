import { BetResult } from '../constants/common.contant';

export default class BettingEvent {
  constructor(public userId: string, private amount: number, private betResult: BetResult) {}
}

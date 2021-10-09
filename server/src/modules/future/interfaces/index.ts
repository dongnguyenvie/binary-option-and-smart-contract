import { BetType } from 'src/modules/shared/constants/common.contant';

export interface Order {
  username: string;
  amount: number;
  betType: BetType;
}

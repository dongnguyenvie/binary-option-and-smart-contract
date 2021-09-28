// eslint-disable-next-line @typescript-eslint/no-var-requires
const BinanceInstance = require('node-binance-api');
import Binance from 'node-binance-api';
import { BINANCE_PROVIDER } from '../data-feed.constant';

const binanceProvider = {
  useFactory: (): Binance => {
    return new BinanceInstance() as Binance;
  },
  provide: BINANCE_PROVIDER,
};

export default binanceProvider;

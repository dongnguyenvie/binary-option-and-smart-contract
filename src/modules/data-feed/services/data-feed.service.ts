import { Inject, Injectable } from '@nestjs/common';
import { BINANCE_PROVIDER, CANDLE_INTERVAL, NUMBER_OF_CANDLE, SYMBOL_PAIR } from '../data-feed.constant';
import Binance from 'node-binance-api';
import { map, Observable, tap } from 'rxjs';
import { SteamChart } from '../interfaces';
import { BetType } from 'src/modules/shared/constants/common.contant';

@Injectable()
export default class DataFeedService {
  constructor(@Inject(BINANCE_PROVIDER) private readonly binance: Binance) {
    // this.fromStream()
    //   .pipe(tap((data) => console.log(data)))
    //   .subscribe();
  }

  steamChart1M: Observable<SteamChart>;

  public fromStream<T extends SteamChart>(): Observable<T> {
    if (!this.steamChart1M) {
      this.steamChart1M = new Observable((subscriber) => {
        this.binance.websockets.chart(
          SYMBOL_PAIR,
          CANDLE_INTERVAL,
          (symbol, interval, chart) => {
            const tick = this.binance.last(chart);
            const last = chart[tick];
            last.isFinal = last.isFinal === undefined;
            last.result =
              last.open > last.close ? BetType.SELL : last.open < last.close ? BetType.BUY : BetType.NONE;
            const candles = Object.entries(chart || {}) as unknown as T;
            subscriber.next(candles);
          },
          NUMBER_OF_CANDLE,
        );
      });
    }
    return this.steamChart1M as Observable<T>;
  }
}

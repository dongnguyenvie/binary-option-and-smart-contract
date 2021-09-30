import { Injectable, OnModuleInit } from '@nestjs/common';
import { map, tap } from 'rxjs';
import { LastCandle } from 'src/modules/data-feed/interfaces';
import DataFeedService from 'src/modules/data-feed/services/data-feed.service';
import { BettingStateService } from 'src/modules/shared/betting-state/betting-state.service';
import dayjs from 'src/modules/shared/helpers/dayjs';

@Injectable()
export default class FutureService implements OnModuleInit {
  constructor(private readonly dataFeedSvc: DataFeedService, private bettingStateSvc: BettingStateService) {}

  onModuleInit() {
    this.dataFeedSvc
      .fromStream()
      .pipe(
        map((data) => {
          const [time, lastCandle] = data[data.length - 1];
          return Object.assign({}, lastCandle as LastCandle, { time });
        }),
      )
      .subscribe((candle) => {
        if (candle.isFinal) {
          const nextCandleTime = dayjs().startOf('minute').unix() * 1000;
          if (nextCandleTime > +candle.time) {
            this.caculateBetting(candle);
          }
        }
      });
  }

  async caculateBetting(canlde: LastCandle) {
    this.bettingStateSvc.getAll().then((bettors) => {
      console.log('caculate');
      console.log(canlde);
      console.log(bettors);
    });
  }
}

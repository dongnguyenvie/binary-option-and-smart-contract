import { InjectQueue } from '@nestjs/bull';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';
import { map } from 'rxjs';
import { LastCandle } from 'src/modules/data-feed/interfaces';
import DataFeedService from 'src/modules/data-feed/services/data-feed.service';
import { BettingStateService } from 'src/modules/shared/betting-state/betting-state.service';
import { BetResult } from 'src/modules/shared/constants/common.contant';
import dayjs from 'src/modules/shared/helpers/dayjs';
import { Bettor } from 'src/modules/shared/interfaces/common.interface';
import BetCalculateJob from 'src/modules/shared/jobs/bet-caculate.job';
import { BET_CALCULATOR, CALCULATE_BET } from '../constants/future.constant';

@Injectable()
export default class FutureService implements OnModuleInit {
  constructor(
    private readonly dataFeedSvc: DataFeedService,
    private bettingStateSvc: BettingStateService,
    @InjectQueue(BET_CALCULATOR)
    private betQueue: Queue,
  ) {}

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
          const canCalculate = isCanCalculateBetting(+candle.time);
          if (canCalculate) {
            this.calculateBetting(candle);
          }
        }
      });
  }

  async calculateBetting(canlde: LastCandle) {
    this.bettingStateSvc.getAll().then((bettors: Bettor[]) => {
      if (!bettors.length) {
        return;
      }
      console.log('calcualte bet');
      bettors.forEach((bettor) => {
        const job = new BetCalculateJob({
          ...bettor,
          betResult: bettor.betType === canlde.result ? BetResult.WIN : BetResult.LOSE,
        });
        this.betQueue.add(CALCULATE_BET, job, {
          removeOnComplete: true,
        });
      });
      this.bettingStateSvc.reset();
    });
  }
}

function isCanCalculateBetting(time: number) {
  const nextCandleTime = dayjs().startOf('minute').unix() * 1000;

  return nextCandleTime > time && (time / 1000 / 60) % 2 === 1;
}

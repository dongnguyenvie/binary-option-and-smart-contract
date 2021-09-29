import { Injectable, OnModuleInit } from '@nestjs/common';
import { tap } from 'rxjs';
import DataFeedService from 'src/modules/data-feed/services/data-feed.service';
import { BettingStateService } from 'src/modules/shared/betting-state/betting-state.service';

@Injectable()
export default class FutureService implements OnModuleInit {
  constructor(private readonly dataFeedSvc: DataFeedService, private bettingStateSvc: BettingStateService) {}

  onModuleInit() {
    // this.bettingStateSvc.set('user2', { amount: 1, type: 1 });
    // this.bettingStateSvc.getAll().then((res) => console.log(res[1].amount));
    // this.bettingStateSvc.get('user2').then((res) => console.log('res', res));
    // this.dataFeedSvc
    //   .fromStream()
    //   .pipe(
    //     tap((data) => {
    //       // console.log('data', data);
    //     }),
    //   )
    //   .subscribe();
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { tap } from 'rxjs';
import DataFeedService from 'src/modules/data-feed/services/data-feed.service';

@Injectable()
export default class FutureService implements OnModuleInit {
  constructor(private readonly dataFeedSvc: DataFeedService) {}

  onModuleInit() {
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

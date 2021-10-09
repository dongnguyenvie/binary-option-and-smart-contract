import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { API } from 'src/app/@core/config/api';
import { BetType } from './future-bet.enum';

@Injectable()
export class FutureOrderService {
  constructor(private http: HttpClient) {}

  order(type: BetType, amount: number, assets: string = 'BTC/USDT') {
    return this.http
      .post(API.order, {
        amount: amount,
        betType: type,
        asset: assets,
      })
      .pipe(
        catchError(error => {
          return of(error);
        }),
      );
  }
}

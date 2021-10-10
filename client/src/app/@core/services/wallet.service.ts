import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { API } from '../config/api';
import { Wallet } from '../interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  $wallet = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  get wallet() {
    return this.$wallet.asObservable();
  }

  fetchGetMyWallet() {
    return this.http.get<Wallet>(API.wallet + '/my-wallet').pipe(
      tap(result => this.$wallet.next(result)),
      catchError(error => {
        return of(error);
      }),
    );
  }
}

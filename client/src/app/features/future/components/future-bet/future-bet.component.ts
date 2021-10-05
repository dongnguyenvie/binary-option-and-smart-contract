import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { BetType } from '../../future-bet.enum';

@Component({
  selector: 'app-future-bet',
  templateUrl: './future-bet.component.html',
  styleUrls: ['./future-bet.component.scss'],
})
export class FutureBetComponent implements OnInit {
  isOrder = false;
  amount = 1;
  timer = timer(0, 1000).pipe(
    map(() => {
      const second = (Date.now() / 1000) % 60;
      this.isOrder = Math.floor((Date.now() / 1000 / 60) % 60) % 2 === 0;
      return Math.max(59 - Math.floor(second), 0);
    }),
  );
  constructor() {}

  betType = {
    BUY: BetType.BUY,
    SELL: BetType.SELL,
  };

  ngOnInit(): void {}

  order(betType: number) {
    // TODO: order API
  }
  updateAmount(isIncrease: boolean, value: number) {
    const valueCheckNumber = isNaN(value) ? 0 : value;
    if (!isIncrease) {
      this.amount = Math.max(this.amount - valueCheckNumber, 0);
    } else {
      this.amount += valueCheckNumber;
    }
  }
}

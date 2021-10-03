import { Component, Input, OnInit } from '@angular/core';
import { BetType } from '../../future-bet.enum';

@Component({
  selector: 'app-future-bet',
  templateUrl: './future-bet.component.html',
  styleUrls: ['./future-bet.component.scss'],
})
export class FutureBetComponent implements OnInit {
  constructor() {}

  betType = {
    BUY: BetType.BUY,
    SELL: BetType.SELL,
  };

  ngOnInit(): void {}

  order(betType: number) {
    // TODO: order API
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastService } from 'src/app/@core/services/toastr.service';
import { BetType } from '../../future-bet.enum';
import { FutureOrderService } from '../../future-order.service';

@Component({
  selector: 'app-future-bet',
  templateUrl: './future-bet.component.html',
  styleUrls: ['./future-bet.component.scss'],
})
export class FutureBetComponent implements OnInit {
  isOrder = false;
  amount: number = 1;
  name = 'Tiep Phan';
  timer = timer(0, 1000).pipe(
    map(() => {
      const second = (Date.now() / 1000) % 60;
      this.isOrder = Math.floor((Date.now() / 1000 / 60) % 60) % 2 === 1;
      return Math.max(59 - Math.floor(second), 0);
    }),
  );

  constructor(
    private futureOrderSvc: FutureOrderService,
    private toastSvc: ToastService,
  ) {}

  betType = {
    BUY: BetType.BUY,
    SELL: BetType.SELL,
  };

  ngOnInit(): void {}

  order(betType: BetType) {
    this.futureOrderSvc.order(betType, +this.amount).subscribe(result => {
      if (!!result.id) {
        this.toastSvc.showToast(
          `${betType === BetType.BUY ? 'BUY' : 'SELL'} ${this.amount}`,
        );
      } else {
      }
    });
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

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataFutureSocketService } from 'src/app/@core/services/data-future-socket.service';
import { FutureSocketService } from 'src/app/@core/services/future-socket.service';
import { BetType } from '../../future-bet.enum';

@Component({
  selector: 'app-future-monitor',
  templateUrl: './future-monitor.component.html',
  styleUrls: ['./future-monitor.component.scss'],
})
export class FutureMonitorComponent implements OnInit, AfterViewInit {
  constructor(
    private futureSocketSvc: FutureSocketService,
    private dataFutureSocketSvc: DataFutureSocketService,
  ) {}

  bettors: any[] = [];

  betType = {
    BUY: BetType.BUY,
    SELL: BetType.SELL,
  };

  ngOnInit(): void {
    this.dataFutureSocketSvc.socket.on('datafuture:orders', bettor => {
      if (this.bettors.length > 40) {
        this.bettors.shift();
      }
      this.bettors.push(bettor);
    });
  }

  ngAfterViewInit(): void {}
}

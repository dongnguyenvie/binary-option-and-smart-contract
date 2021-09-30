import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { createChart, CrosshairMode, ISeriesApi } from 'lightweight-charts';
import { SocketService } from '../@core/services/socket.service';
import chartCandle from './data-feed';
import { Candle, DateChart } from './interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chart')
  chart!: ElementRef;
  currentBar: Candle;
  dataFeed: Candle[] = chartCandle;
  candleSeries: ISeriesApi<'Candlestick'>;

  lastClose: number = this.dataFeed[this.dataFeed.length - 1].close;
  lastIndex: number = this.dataFeed.length - 1;

  targetIndex = this.lastIndex + 105 + Math.round(Math.random() + 30);
  targetPrice = this.getRandomPrice();

  currentIndex = this.lastIndex + 1;
  currentBusinessDay = { day: 29, month: 5, year: 2019 };
  ticksInCurrentBar = 0;

  constructor(private socketService: SocketService) {
    this.currentBar = {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      time: this.currentBusinessDay,
    };
    this.socketService.connectSocketWithToken('token', 'userId');
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    const chart = createChart(this.chart.nativeElement, {
      width: 600,
      height: 300,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });
    console.log(this.dataFeed);
    this.candleSeries = chart.addCandlestickSeries();
    this.candleSeries.setData(this.dataFeed);
    setInterval(() => {
      this.updateChart();
    }, 1000);
  }

  mergeTickToBar(price: number) {
    if (!this.currentBar.open) {
      this.currentBar.open = price;
      this.currentBar.high = price;
      this.currentBar.low = price;
      this.currentBar.close = price;
    } else {
      this.currentBar.close = price;
      this.currentBar.high = Math.max(this.currentBar.high, price);
      this.currentBar.low = Math.min(this.currentBar.low, price);
    }
    this.candleSeries.update(this.currentBar);
  }

  reset() {
    this.candleSeries.setData(this.dataFeed);
    this.lastClose = this.dataFeed[this.dataFeed.length - 1].close;
    this.lastIndex = this.dataFeed.length - 1;

    this.targetIndex = this.lastIndex + 5 + Math.round(Math.random() + 30);
    this.targetPrice = this.getRandomPrice();

    this.currentIndex = this.lastIndex + 1;
    this.currentBusinessDay = { day: 29, month: 5, year: 2019 };
    this.ticksInCurrentBar = 0;
  }

  getRandomPrice() {
    return 10 + Math.round(Math.random() * 10000) / 100;
  }

  nextBusinessDay(time: DateChart) {
    const d = new Date();
    d.setUTCFullYear(time.year);
    d.setUTCMonth(time.month - 1);
    d.setUTCDate(time.day + 1);
    d.setUTCHours(0, 0, 0, 0);
    return {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate(),
    };
  }
  updateChart() {
    const deltaY = this.targetPrice - this.lastClose;
    const deltaX = this.targetIndex - this.lastIndex;
    const angle = deltaY / deltaX;
    const basePrice =
      this.lastClose + (this.currentIndex - this.lastIndex) * angle;
    const noise = 0.1 - Math.random() * 0.2 + 1.0;
    const noisedPrice = basePrice * noise;
    console.log(noisedPrice);
    this.mergeTickToBar(noisedPrice);
    if (++this.ticksInCurrentBar === 5) {
      // move to next bar
      this.currentIndex++;
      this.currentBusinessDay = this.nextBusinessDay(this.currentBusinessDay);
      this.currentBar = {
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        time: this.currentBusinessDay,
      };
      this.ticksInCurrentBar = 0;
      if (this.currentIndex === 5000) {
        this.reset();
        return;
      }
      if (this.currentIndex === this.targetIndex) {
        // change trend
        this.lastClose = noisedPrice;
        this.lastIndex = this.currentIndex;
        this.targetIndex = this.lastIndex + 5 + Math.round(Math.random() + 30);
        this.targetPrice = this.getRandomPrice();
      }
    }
  }
}

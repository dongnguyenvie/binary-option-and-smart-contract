import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { createChart, CrosshairMode, ISeriesApi } from 'lightweight-charts';
import { Candle, DateChart } from './interface';
import { map } from 'rxjs';
import { DataFutureSocketService } from 'src/app/@core/services/data-future-socket.service';
import { FutureSocketService } from 'src/app/@core/services/future-socket.service';
import { checkCandleDisable } from './utils/future-chat.util';
import { BUY_CANDLE, SELL_CANDLE } from './constants/future-chat.constant';

@Component({
  selector: 'app-future-chat',
  templateUrl: './future-chat.component.html',
  styleUrls: ['./future-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FutureChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chart')
  chart!: ElementRef;
  currentBar: Candle;
  candleSeries: ISeriesApi<'Candlestick'>;
  volumeSeries: ISeriesApi<'Histogram'>;

  lastClose: number;
  lastIndex: number;

  targetPrice = this.getRandomPrice();

  currentBusinessDay = { day: 29, month: 5, year: 2019 };
  ticksInCurrentBar = 0;

  constructor(private dataFutureSvc: DataFutureSocketService, private futureSvc: FutureSocketService) {
    this.currentBar = {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      time: this.currentBusinessDay,
    };
    this.dataFutureSvc.connectSocket();
    this.futureSvc.connectSocket('tokenxxxxxxx');
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    let isScale = false;
    const chart = createChart(this.chart.nativeElement, {
      width: 800,
      height: 500,
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      layout: {
        backgroundColor: '#131722',
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
      },
    });

    this.candleSeries = chart.addCandlestickSeries();
    this.volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    this.dataFutureSvc.chart
      .pipe(
        map((candles: any) => {
          return candles.map((candle: any) => {
            const [time, tick] = candle;
            tick.time = time / 1000;
            return tick;
          });
        }),
      )
      .subscribe(data => {
        this.candleSeries.setData(data);
        if (!isScale) {
          chart.timeScale().fitContent();
          isScale = true;
        }
      });

    this.dataFutureSvc.chart
      .pipe(
        map((candles: any) => {
          return candles.map((candle: any) => {
            const [time, tick] = candle;
            let color = 'rgba(171, 183, 183, 0.5)';
            const isCandleDisable = checkCandleDisable(time);
            if (!isCandleDisable) {
              const isUptrend = tick.close - tick.open >= 0;
              color = isUptrend ? BUY_CANDLE : SELL_CANDLE;
            }
            return {
              time: time / 1000,
              value: tick.volume / 300,
              color: color,
            };
          });
        }),
      )
      .subscribe(data => {
        this.volumeSeries.setData(data);
      });
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
}

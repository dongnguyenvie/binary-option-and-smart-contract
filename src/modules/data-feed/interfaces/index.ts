export interface SteamChart {
  chart: Chart;
  last: LastCandle;
}

interface Chart {
  [name: string]: Candle;
}

interface LastCandle {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  isFinal: boolean;
  result: number;
}

interface Candle {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

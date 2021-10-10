export type SteamChart = [string, Candle | LastCandle][];

interface Chart {
  [name: string]: Candle;
}

export interface LastCandle {
  time?: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  isFinal: boolean;
  result: number;
}

export interface DateChart {
  day: number;
  month: number;
  year: number;
}

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  time: string | DateChart;
}

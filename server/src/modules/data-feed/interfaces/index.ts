export type SteamChart = [string, Candle | LastCandle][];

interface Chart {
  [name: string]: Candle;
}

export interface LastCandle {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  isFinal: boolean;
  result: number;
  time?: string;
}

interface Candle {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

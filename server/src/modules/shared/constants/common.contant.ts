export enum Status {
  DELETE = 0,
  ACTIVE = 1,
  LOCK = 2,
}

export enum BetType {
  NONE = 0,
  BUY = 1,
  SELL = 2,
}

export enum WalletStatus {
  DELETE = 0,
  ACTIVE = 1,
  LOCK = 2,
}

export enum TransactionType {
  BETTING = 0,
  DEPOSIT = 1,
  WITHDRAW = 2,
}

export enum OrderStatus {
  OPEN = 1,
  WAITING = 2,
  FINiSH = 3,
  WON = 4,
  LOST = 5,
}

export enum BetResult {
  LOSE = 0,
  WIN = 1,
}

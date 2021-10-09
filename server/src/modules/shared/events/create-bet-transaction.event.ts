export default class CreateBetTransactionEvent {
  public profit: number;
  public orderId: string;
  public walletId: string;
  public userId: string;

  constructor(partial: Partial<CreateBetTransactionEvent>) {
    Object.assign(this, partial);
  }
}

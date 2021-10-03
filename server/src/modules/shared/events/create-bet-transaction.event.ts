export default class CreateBetTransactionEvent {
  public profit: number;
  public orderId: string;

  constructor(partial: Partial<CreateBetTransactionEvent>) {
    Object.assign(this, partial);
  }
}

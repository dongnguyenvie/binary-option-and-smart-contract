export default class CreateDepositTransactionEvent {
  public userId: string;
  public amount: number;
  public timestamp: string;
  public tx: string;
  public address: string;

  constructor(partial: Partial<CreateDepositTransactionEvent>) {
    Object.assign(this, partial);
  }
}

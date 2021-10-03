export default class SyncWalletToMemoryEvent {
  public userId: string;

  constructor(partial: Partial<SyncWalletToMemoryEvent>) {
    Object.assign(this, partial);
  }
}

declare global {
  interface Window {
    ethereum: Ethereumish;
  }
}

export interface EthereumEvent {
  connect: any;
  disconnect: any;
  accountsChanged: Array<string>;
  chainChanged: string;
  message: any;
}

type EventKeys = keyof EthereumEvent;
type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

export interface Ethereumish {
  autoRefreshOnNetworkChange: boolean;
  chainId: string;
  isMetaMask?: boolean;
  isStatus?: boolean;
  networkVersion: string;
  selectedAddress: any;

  on<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
  enable(): Promise<any>;
  request?: (request: { method: string; params?: Array<any> }) => Promise<any>;
  /**
   * @deprecated
   */
  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void,
  ) => void;
  sendAsync: (request: any) => Promise<unknown>;
}

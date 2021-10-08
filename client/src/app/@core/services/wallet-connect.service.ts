import { Injectable } from '@angular/core';
import Web3 from 'web3';

import { BehaviorSubject, fromEvent, Observable, of, Subject, tap } from 'rxjs';
declare let window: any;
const ONE_ETH_TO_GWEI = 1e18;
@Injectable({
  providedIn: 'root',
})
export class WalletConnectService {
  private ethereum: any;
  private web3: any;
  private $isMetamaskInstall = new BehaviorSubject<boolean>(false);
  private $accountChanges: Observable<unknown>;
  private $accountsSelected = new BehaviorSubject<string[]>([]);
  private $balanceAccountsSelected = new BehaviorSubject<{
    account: string;
    balance: number;
  }>({
    account: '',
    balance: 0,
  });

  constructor() {
    this.handleCheckMetamaskInstall();
  }

  async connectAccount() {
    if (this.ethereum) {
      try {
        const accounts = await this.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length > 0) {
          this.$accountsSelected.next(accounts as string[]);
          await this.getUserBalanceByAccount();
        } else {
          //TODO: handle not found user
        }
      } catch (error) {
        //TODO: handle retrieving account
        // if (error.code === 4001) {
        //   // EIP-1193 userRejectedRequest error
        //   console.log('Please connect to MetaMask.');
        // } else {
        //   console.error(error);
        // }
      }
    }
  }

  handleCheckMetamaskInstall() {
    if (!!window.ethereum) {
      this.ethereum = window.ethereum;
      this.initListenAccountChange();
      this.initWeb3();
      this.$isMetamaskInstall.next(true);
    } else {
      this.$isMetamaskInstall.next(false);
    }
  }

  initListenAccountChange() {
    this.$accountChanges = fromEvent(this.ethereum, 'accountsChanged').pipe(
      tap(accounts => {
        console.log(accounts);
        this.$accountsSelected.next(accounts as string[]);
        this.getUserBalanceByAccount();
      }),
    );
  }

  initWeb3() {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = window.web3.currentProvider;
    } else {
      this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    window.web3 = new Web3(window.ethereum);
  }

  public async getUserBalanceByAccount(): Promise<any> {
    try {
      const account = this.$accountsSelected.getValue();
      const balancePromise = new Promise((resolve, reject) => {
        window.web3.eth.getBalance(
          account[0],
          function (err: any, balance: any) {
            if (!err) {
              const retVal = {
                account: account,
                balance: (balance / ONE_ETH_TO_GWEI).toFixed(2),
              };
              resolve(retVal);
            } else {
              reject({ account: 'error', balance: 0 });
            }
          },
        );
      }) as Promise<any>;
      const balance = await balancePromise;
      this.$balanceAccountsSelected.next(balance);
    } catch (error) {}
  }

  get isMetamaskInstall() {
    return this.$isMetamaskInstall.asObservable();
  }
  get listenAccountChange() {
    return this.$accountChanges;
  }
  get accountSelected() {
    return this.$accountsSelected;
  }
  get balanceAccountSelected() {
    return this.$balanceAccountsSelected;
  }
}

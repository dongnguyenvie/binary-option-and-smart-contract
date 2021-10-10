import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { ToastService } from './toastr.service';
import { BehaviorSubject, fromEvent, Observable, of, Subject, tap } from 'rxjs';
import { Contract } from 'web3-eth-contract';
import { HHD_ABI, HHD_ADDRESS } from '../config/contract';
import { provider as web3Provider } from 'web3-core';

const ONE_ETH_TO_GWEI = 1e18;
@Injectable({
  providedIn: 'root',
})
export class WalletConnectService {
  private ethereum: any;
  private hhdContract: Contract;
  private web3: Web3;
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

  constructor(private toastService: ToastService) {
    this.handleCheckMetamaskInstall();
  }

  async connectAccount() {
    if (this.ethereum) {
      try {
        const accounts = await this.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length > 0) {
          console.warn('accounts', accounts);
          this.$accountsSelected.next(accounts as string[]);
          await this.getUserBalanceByAccount();
          return accounts;
        } else {
          //TODO: handle not found user
        }
      } catch (error) {
        console.log(error);
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

  async walletRequestPermissions() {
    if (this.ethereum) {
      try {
        const permissions = await this.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
        const accountsPermission = permissions.find(
          (permission: any) => permission.parentCapability === 'eth_accounts',
        );
        if (accountsPermission) {
          this.toastService.showToast(
            'Success',
            'ETH accounts permission successfully requested',
            'success',
          );
        }
      } catch (error: any) {
        if (error.code === 4001) {
          this.toastService.showToast(
            'Error permission',
            'Permissions needed to continue.',
            'danger',
          );
          return;
        }
        if (error.code === -32002) {
          this.toastService.showToast(
            'Error automation',
            'Pls open your Memtamask',
            'danger',
          );
          return;
        }
        console.error(error);
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
    // this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
    this.web3 = new Web3(window.ethereum);
    this.hhdContract = new this.web3.eth.Contract(HHD_ABI, HHD_ADDRESS);
    window.ethereum.enable();
  }

  public async getUserBalanceByAccount(): Promise<any> {
    try {
      const account = this.$accountsSelected.getValue();

      const balancePromise = new Promise((resolve, reject) => {
        // this.web3.eth.getBalance(account[0], function (err: any, balance: any) {
        //   if (!err) {
        //     const retVal = {
        //       account: account,
        //       balance: (balance / ONE_ETH_TO_GWEI).toFixed(2),
        //     };
        //     resolve(retVal);
        //   } else {
        //     reject({ account: 'error', balance: 0 });
        //   }
        // });
        this.hhdContract.methods
          .balanceOf(account[0])
          .call()
          .then((balance: string) => {
            console.warn(`balanceof ${account[0]}`, balance);
            const retVal = {
              account: account,
              balance: (+balance / ONE_ETH_TO_GWEI).toFixed(2),
            };
            resolve(retVal);
          })
          .catch(() => {
            reject({ account: 'error', balance: 0 });
          });
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

declare global {
  interface Window {
    ethereum: web3Provider & { enable: () => void };
  }
}

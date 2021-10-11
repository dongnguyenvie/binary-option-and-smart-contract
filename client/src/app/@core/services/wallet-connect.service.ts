import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { ToastService } from './toastr.service';
import {
  BehaviorSubject,
  catchError,
  fromEvent,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { Contract } from 'web3-eth-contract';
import getBlockchain from '../libs/ethereum';
import { BigNumber, ethers } from 'ethers';
import { WALLET_CONNECT_STATUS } from '../config/api';

const WALLET_STATUS = {
  injected: 'injected',
};
@Injectable({
  providedIn: 'root',
})
export class WalletConnectService {
  private $hhd = new BehaviorSubject<ethers.Contract>(null as any);
  private $hhdFaucet = new BehaviorSubject<ethers.Contract>(null as any);
  private $paymentProcessor = new BehaviorSubject<ethers.Contract>(null as any);
  private $provider = new BehaviorSubject<ethers.providers.Web3Provider>(
    null as any,
  );
  private $signer = new BehaviorSubject<ethers.providers.JsonRpcSigner>(
    null as any,
  );
  private $account = new BehaviorSubject<string>('');

  constructor(private toastService: ToastService) {
    if (this.isWalletConnected) {
      this.connectWallet();
    }
  }

  get isWalletConnected() {
    return (
      localStorage.getItem(WALLET_CONNECT_STATUS) === WALLET_STATUS.injected ||
      !!this.account.getValue()
    );
  }

  public async connectWallet() {
    try {
      const { hhd, hhdFaucet, paymentProcessor, provider } =
        await getBlockchain();
      const signer = provider?.getSigner()!;
      const account = await signer.getAddress();

      localStorage.setItem(WALLET_CONNECT_STATUS, WALLET_STATUS.injected);

      this.$account.next(account);
      this.$hhd.next(hhd!.connect(signer));
      this.$hhdFaucet.next(hhdFaucet!.connect(signer));
      this.$paymentProcessor.next(paymentProcessor!.connect(signer));
      this.$provider.next(provider!);
      this.$signer.next(signer!);
    } catch (error) {}
  }

  public async disconnectWallet() {
    localStorage.removeItem(WALLET_CONNECT_STATUS);
    this.$account.next('');
  }

  get balance() {
    return this.$hhd
      .asObservable()
      .pipe(
        switchMap(
          hhd =>
            hhd.balanceOf(
              this.$account.getValue(),
            ) as unknown as Promise<BigNumber>,
        ),
      );
  }

  get address() {
    return this.$account;
  }

  get account() {
    return this.$account;
  }

  get hhd() {
    return this.$hhd;
  }

  get hhdFaucet() {
    return this.$hhdFaucet;
  }

  get paymentProcessor() {
    return this.$paymentProcessor;
  }
}

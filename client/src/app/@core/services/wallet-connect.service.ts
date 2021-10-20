import { Injectable } from '@angular/core';
import { ToastService } from './toastr.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import getBlockchain from '../libs/ethereum';
import { BigNumber, ethers } from 'ethers';
import { WALLET_CONNECT_STATUS } from '../config/api';
import { HHD, HHDFaucet, HHDPaymentProcessor } from '../contracts';

const WALLET_STATUS = {
  injected: 'injected',
};
@Injectable({
  providedIn: 'root',
})
export class WalletConnectService {
  private $hhd = new BehaviorSubject<HHD>(null as any);
  private $hhdFaucet = new BehaviorSubject<HHDFaucet>(null as any);
  private $paymentProcessor = new BehaviorSubject<HHDPaymentProcessor>(
    null as any,
  );
  private $provider = new BehaviorSubject<ethers.providers.Web3Provider>(
    null as any,
  );
  private $signer = new BehaviorSubject<ethers.providers.JsonRpcSigner>(
    null as any,
  );
  private $account = new BehaviorSubject<string>('');

  constructor(private toastService: ToastService) {
    this.init();
    if (this.isWalletConnected) {
      this.connectWallet();
    }
  }

  get isWalletConnected() {
    return (
      localStorage.getItem(WALLET_CONNECT_STATUS) === WALLET_STATUS.injected &&
      !!this.address.getValue()
    );
  }

  private async init() {
    const { hhd, hhdFaucet, paymentProcessor, provider, signer } =
      await getBlockchain();

    this.$provider.next(provider!);
    this.$hhd.next(hhd!);
    this.$hhdFaucet.next(hhdFaucet!);
    this.$paymentProcessor.next(paymentProcessor!);

    this.$signer.next(signer!);
    try {
      const signerAddress = await signer!.getAddress();
      this.$account.next(signerAddress);
      this.$hhd.next(hhd!.connect(signer!));
      this.$hhdFaucet.next(hhdFaucet!.connect(signer!));
      this.$paymentProcessor.next(paymentProcessor!.connect(signer!));
    } catch (error) {}
  }

  public async connectWallet() {
    try {
      const provider = this.$provider.getValue();
      const [addr] = await provider?.send('eth_requestAccounts', []);
      this.$account.next(addr);
      const signer = this.signer.getValue();
      this.$hhd.next(this.hhd.getValue().connect(signer));
      this.$hhdFaucet.next(this.hhdFaucet.getValue().connect(signer));
      this.$paymentProcessor.next(
        this.paymentProcessor.getValue().connect(signer),
      );
      localStorage.setItem(WALLET_CONNECT_STATUS, WALLET_STATUS.injected);
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

  get signer() {
    return this.$signer;
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

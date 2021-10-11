import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/@core/services/wallet-connect.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { HHD_Faucet_ABI, HHD_Faucet_ADRESS } from './faucet.config';
import { ToastService } from 'src/app/@core/services/toastr.service';
import { MESSAGES_CODE } from 'src/app/@core/config/messages';

@Component({
  selector: 'app-faucet',
  templateUrl: './faucet.component.html',
  styleUrls: ['./faucet.component.scss'],
})
export class FaucetComponent implements OnInit {
  $account = this.walletConnectSvc.address;
  $hhdFaucet = this.walletConnectSvc.hhdFaucet;
  isLoading = false;

  constructor(
    private walletConnectSvc: WalletConnectService,
    private toastSvc: ToastService,
  ) {}

  async getFreeToken() {
    try {
      this.isLoading = true;
      const hhdFaucet = this.$hhdFaucet.getValue();
      const tx = await hhdFaucet.getFreeToken();
      console.warn('tx', tx);
      const resultTx = await tx.wait();
      console.warn('resultTx', resultTx);
      this.isLoading = false;
    } catch (e: any) {
      console.warn('e.code ', e.code);
      this.toastSvc.showToast(
        'Faucet!',
        MESSAGES_CODE[e.code as keyof typeof MESSAGES_CODE],
        'danger',
      );
      this.isLoading = false;
    }
  }

  connectWallet() {
    this.walletConnectSvc.connectWallet();
  }

  changeAccountMetaMask() {
    this.walletConnectSvc.connectWallet();
  }

  async ainit() {
    await this.walletConnectSvc.connectWallet();
    this.walletConnectSvc.balance.subscribe(async result => {
      console.log('result', result.toString());
    });
  }

  ngOnInit() {}
}

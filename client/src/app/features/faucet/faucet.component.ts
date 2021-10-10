import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from 'src/app/@core/services/wallet-connect.service';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { HHD_Faucet_ABI, HHD_Faucet_ADRESS } from './faucet.config';
import { ToastService } from 'src/app/@core/services/toastr.service';

@Component({
  selector: 'app-faucet',
  templateUrl: './faucet.component.html',
  styleUrls: ['./faucet.component.scss'],
})
export class FaucetComponent implements OnInit {
  contract: Contract;
  $accounts = this.walletConnectSvc.accountSelected;
  isLoading = false;

  constructor(
    private walletConnectSvc: WalletConnectService,
    private toastSvc: ToastService,
  ) {
    const web3 = new Web3((window as any).ethereum);
    this.contract = new web3.eth.Contract(HHD_Faucet_ABI, HHD_Faucet_ADRESS);
  }

  getHHDToken() {
    this.isLoading = true;
    this.contract.methods
      .giveToken()
      .send({
        from: this.walletConnectSvc.accountSelected.getValue()[0],
      })
      .then((result: any) => {
        console.warn('getHHDToken result', result);
        this.walletConnectSvc.getUserBalanceByAccount();
        this.toastSvc.showToast('Faucet !', 'You got 0.01 HHD', 'success');
      })
      .catch((err: any) => {
        console.error('getHHDToken err', err);
        this.toastSvc.showToast(
          'Faucet !',
          'Maybe has some problem',
          'success',
        );
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  requestConnectMetaMask() {
    this.walletConnectSvc.connectAccount();
  }

  changeAccountMetaMask() {
    this.walletConnectSvc.walletRequestPermissions().catch(() => {
      alert('open your metamask');
    });
  }

  ngOnInit() {}
}

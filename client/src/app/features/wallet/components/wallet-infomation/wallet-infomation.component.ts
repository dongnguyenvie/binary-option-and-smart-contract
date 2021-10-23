import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Wallet } from 'src/app/@core/interfaces/common';
import { AccountService } from 'src/app/@core/services/account.service';
import { WalletService } from 'src/app/@core/services/wallet.service';

@Component({
  selector: 'app-wallet-infomation',
  templateUrl: './wallet-infomation.component.html',
  styleUrls: ['./wallet-infomation.component.scss'],
})
export class WalletInfomationComponent implements OnInit {
  $profile = this.accountsvc.profile;
  wallet = this.walletSvc.wallet;

  constructor(
    private accountsvc: AccountService,
    private walletSvc: WalletService,
  ) {}

  ngOnInit() {
    this.walletSvc.fetchGetMyWallet().subscribe(result => {});
  }
}

import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/@core/services/account.service';

@Component({
  selector: 'app-profile-wallet',
  templateUrl: './profile-wallet.component.html',
  styleUrls: ['./profile-wallet.component.scss'],
})
export class ProfileWalletComponent implements OnInit {
  profile = this.accountService.profile;

  constructor(private accountService: AccountService) {}

  get isWalletCreated() {
    return this.profile && !!this.profile.wallet;
  }

  createWallet() {}

  ngOnInit(): void {}
}

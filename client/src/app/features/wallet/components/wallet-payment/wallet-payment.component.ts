import { Component, OnInit } from '@angular/core';
import { ethers, BigNumber } from 'ethers';
import { AccountService } from 'src/app/@core/services/account.service';
import { WalletConnectService } from 'src/app/@core/services/wallet-connect.service';
import { WalletService } from 'src/app/@core/services/wallet.service';

@Component({
  selector: 'app-wallet-payment',
  templateUrl: './wallet-payment.component.html',
  styleUrls: ['./wallet-payment.component.scss'],
})
export class WalletPaymentComponent implements OnInit {
  private paymentProcessor = this.walletConnectSvc.paymentProcessor;
  private hhd = this.walletConnectSvc.hhd;

  amount = 0;

  constructor(
    private walletConnectSvc: WalletConnectService,
    private accountSvc: AccountService,
    private walletSvc: WalletService,
  ) {
    // console.log(ethers.utils.formatUnits(BigNumber.from('10000000000000000')));
    // console.log(ethers.utils.parseEther('0.01').toString());
  }

  ngOnInit() {}

  async deposit(amount: string) {
    const _amount = ethers.utils.parseEther(amount);
    const user = this.accountSvc.getUser().getValue();

    const paymentProcessor = this.paymentProcessor.getValue();
    const hhd = this.hhd.getValue();

    const tx1 = await hhd.approve(paymentProcessor.address, _amount);
    console.warn('tx1', tx1);
    const tx1done = await tx1.wait();
    console.warn('tx1done', tx1done);

    const tx2 = await paymentProcessor.deposit(_amount, user.id);
    console.warn('tx2', tx2);
    const receipt = await tx2.wait();
    setTimeout(() => {
      this.walletConnectSvc.refresh();
      this.walletSvc.fetchGetMyWallet().subscribe(() => {});
    }, 5000);
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('receipt', receipt);
  }

  async buyToken() {
    const _amount = ethers.utils.parseEther(this.amount.toString());
    const paymentProcessor = this.paymentProcessor.getValue();
    const singer = this.walletConnectSvc.signer.getValue();
    const tx = await paymentProcessor.buyToken({
      value: _amount,
    });
    console.warn('tx1', tx);
    const tx1done = await tx.wait();
    console.warn('tx1done', tx1done);
    setTimeout(() => {
      this.walletConnectSvc.refresh();
    }, 1000);
  }
}

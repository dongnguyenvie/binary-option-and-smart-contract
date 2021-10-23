import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletInfomationComponent } from './components/wallet-infomation/wallet-infomation.component';
import { TimePipe } from './pipes/time.pipe';
import { WalletPaymentComponent } from './components/wallet-payment/wallet-payment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TimePipe, WalletInfomationComponent, WalletPaymentComponent],
  exports: [WalletInfomationComponent, WalletPaymentComponent],
})
export class WalletModule {}

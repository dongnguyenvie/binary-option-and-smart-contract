import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletInfomationComponent } from './components/wallet-infomation/wallet-infomation.component';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TimePipe, WalletInfomationComponent],
  exports: [WalletInfomationComponent],
})
export class WalletModule {}

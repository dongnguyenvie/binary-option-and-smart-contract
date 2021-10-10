import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletPageComponent } from './wallet-page.component';
import { WalletPageRoutingModule } from './wallet-page-routing.module';
import { WalletModule } from 'src/app/features/wallet/wallet.module';

@NgModule({
  imports: [CommonModule, WalletPageRoutingModule, WalletModule],
  declarations: [WalletPageComponent],
})
export class WalletPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaucetPageComponent } from './faucet-page.component';
import { FaucetPageRoutingModule } from './faucet-page-routing';
import { FaucetModule } from 'src/app/features/faucet/faucet.module';

@NgModule({
  imports: [CommonModule, FaucetPageRoutingModule, FaucetModule],
  declarations: [FaucetPageComponent],
})
export class FaucetPageModule {}

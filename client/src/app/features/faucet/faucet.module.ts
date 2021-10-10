import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaucetComponent } from './faucet.component';
import { AddressButtonComponent } from 'src/app/shared/address-button/address-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FaucetComponent, AddressButtonComponent],
  exports: [FaucetComponent],
})
export class FaucetModule {}

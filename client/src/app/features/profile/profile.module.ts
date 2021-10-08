import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileWalletComponent } from './components/profile-wallet/profile-wallet.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';

@NgModule({
  declarations: [ProfileWalletComponent, ProfileInformationComponent],
  imports: [CommonModule],
  exports: [ProfileWalletComponent, ProfileInformationComponent],
})
export class ProfileModule {}

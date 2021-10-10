import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { WalletService } from 'src/app/@core/services/wallet.service';

@NgModule({
  declarations: [ProfileInformationComponent],
  imports: [CommonModule],
  exports: [ProfileInformationComponent],
  providers: [WalletService],
})
export class ProfileModule {}

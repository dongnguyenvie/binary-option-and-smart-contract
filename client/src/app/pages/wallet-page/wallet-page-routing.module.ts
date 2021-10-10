import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletPageComponent } from './wallet-page.component';

const routes: Routes = [
  {
    path: '',
    component: WalletPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPageRoutingModule {}

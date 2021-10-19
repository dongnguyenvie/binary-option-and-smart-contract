import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftGalleryPageComponent } from './nft-gallery-page.component';

const routes: Routes = [
  {
    path: '',
    component: NftGalleryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftGalleryPageRoutingModule {}

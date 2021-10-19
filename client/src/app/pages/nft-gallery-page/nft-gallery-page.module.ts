import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftGalleryPageRoutingModule } from './nft-gallery-page-routing.module';
import { NftGalleryModule } from 'src/app/features/nft-gallery/nft-gallery.module';
import { NftGalleryPageComponent } from './nft-gallery-page.component';
import { MarioGameComponent } from 'src/app/shared/mario-game/mario-game.component';

@NgModule({
  imports: [CommonModule, NftGalleryPageRoutingModule, NftGalleryModule],
  declarations: [NftGalleryPageComponent, MarioGameComponent],
  exports: [],
})
export class NftGalleryPageModule {}

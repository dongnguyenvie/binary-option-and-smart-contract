import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftGalleryToolbarComponent } from './components/nft-gallery-toolbar/nft-gallery-toolbar.component';
import { NftGallerySearchComponent } from './components/nft-gallery-search/nft-gallery-search.component';
import { NftGalleryFilterComponent } from './components/nft-gallery-filter/nft-gallery-filter.component';
import { NftGalleryContentComponent } from './components/nft-gallery-content/nft-gallery-content.component';
import { NftGalleryCardComponent } from './components/nft-gallery-card/nft-gallery-card.component';
import {
  NbButtonModule,
  NbDialogModule,
  NbFormFieldModule,
  NbInputModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NftGalleryMintDialogComponent } from './components/nft-gallery-mint-dialog/nft-gallery-mint-dialog.component';
import { MarioGameComponent } from 'src/app/shared/mario-game/mario-game.component';

const shared = [
  NftGalleryToolbarComponent,
  NftGallerySearchComponent,
  NftGalleryFilterComponent,
  NftGalleryContentComponent,
  NftGalleryCardComponent,
];
@NgModule({
  imports: [
    CommonModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbInputModule,
  ],
  declarations: [...shared, MarioGameComponent],
  exports: [...shared],
})
export class NftGalleryModule {}

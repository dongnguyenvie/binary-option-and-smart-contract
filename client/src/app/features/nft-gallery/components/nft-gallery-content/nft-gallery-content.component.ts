import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NFT } from 'src/app/@core/interfaces/common';
import { NftService } from 'src/app/@core/services/nft.service';
import { MarioGameComponent } from 'src/app/shared/mario-game/mario-game.component';
@Component({
  selector: 'app-nft-gallery-content',
  templateUrl: './nft-gallery-content.component.html',
  styleUrls: ['./nft-gallery-content.component.scss'],
})
export class NftGalleryContentComponent implements OnInit {
  constructor(
    private nftSvc: NftService,
    private dialogService: NbDialogService,
  ) {}
  data = this.nftSvc.data;
  attributes = this.nftSvc.attributes;

  ngOnInit() {
    (window as any).nft = this.nftSvc;
    this.nftSvc.$nft.getValue().setEndpoint('http://localhost:5000/api/nfts/');
    this.nftSvc.data.subscribe(e => {
      console.log(e);
    });
    // this.attributes.subscribe(attr => {
    //   console.log({ attr });
    // });
  }

  openReviewSprite(nft: NFT, attrs: any[]) {
    const spriteAttr: any = {};
    attrs.forEach((obj: any) => {
      spriteAttr[obj.trait_type] = obj.value;
    });
    Object.assign(nft, { attrs: spriteAttr });
    this.dialogService.open(MarioGameComponent, {
      context: {
        nft: nft,
      },
    });
  }
}

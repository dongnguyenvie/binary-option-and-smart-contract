import { Component, OnInit } from '@angular/core';
import { NftService } from 'src/app/@core/services/nft.service';

@Component({
  selector: 'app-nft-gallery-content',
  templateUrl: './nft-gallery-content.component.html',
  styleUrls: ['./nft-gallery-content.component.scss'],
})
export class NftGalleryContentComponent implements OnInit {
  constructor(private nftSvc: NftService) {}

  ngOnInit() {
    (window as any).nft = this.nftSvc;
    this.nftSvc.data.subscribe(e => {
      console.log(e);
    });
  }
}

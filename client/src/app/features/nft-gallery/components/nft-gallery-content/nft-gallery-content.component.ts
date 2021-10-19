import { Component, OnInit } from '@angular/core';
import { NftService } from 'src/app/@core/services/nft.service';
@Component({
  selector: 'app-nft-gallery-content',
  templateUrl: './nft-gallery-content.component.html',
  styleUrls: ['./nft-gallery-content.component.scss'],
})
export class NftGalleryContentComponent implements OnInit {
  constructor(private nftSvc: NftService) {}
  data = this.nftSvc.data;

  ngOnInit() {
    (window as any).nft = this.nftSvc;
    // this.nftSvc.$nft.getValue().setEndpoint('http://localhost:5000/api/nfts/');
    // this.nftSvc.data.subscribe(e => {
    //   console.log(e);
    // });
  }
}

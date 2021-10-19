import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface NFT {
  assets: string;
  name: string;
  description: string;
}
@Component({
  selector: 'app-nft-gallery-mint-dialog',
  templateUrl: './nft-gallery-mint-dialog.component.html',
  styleUrls: ['./nft-gallery-mint-dialog.component.scss'],
})
export class NftGalleryMintDialogComponent implements OnInit {
  @Output() newNftEvent = new EventEmitter<NFT>();

  assets = '';
  description = '';
  name = '';

  constructor() {}

  ngOnInit() {}

  newNftItem() {
    console.log("xxx")
    console.log(this.assets);
  }
}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { NftService } from 'src/app/@core/services/nft.service';
import { WalletConnectService } from 'src/app/@core/services/wallet-connect.service';

interface NFT {}
@Component({
  selector: 'app-nft-gallery-toolbar',
  templateUrl: './nft-gallery-toolbar.component.html',
  styleUrls: ['./nft-gallery-toolbar.component.scss'],
})
export class NftGalleryToolbarComponent implements OnInit {
  assets = '';

  nftForm = this.fb.group({
    assets: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  address = this.walletService.address;

  isConnected = this.walletService.isWalletConnected;

  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private nftService: NftService,
    private walletService: WalletConnectService,
  ) {}

  async ngOnInit() {
    // let nftService = this.nftService.$nft.getValue();
    // const singer = this.walletService.signer.getValue();
    // console.log('xxxx', this.walletService.address.getValue());
    // nftService = nftService.connect(singer);
    // nftService.setEndpoint('http://localhost:5000/api/nfts/');
  }

  openMintDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      // context: {
      //   title: 'This is a title passed to the dialog component',
      // },
    });
  }

  connectWalletPressed() {
    this.walletService.connectWallet();
  }

  async newNftItem() {
    if (!this.nftForm.valid) return;
    const assets = this.nftForm.get('assets')!.value;
    const name = this.nftForm.get('name')!.value;
    const description = this.nftForm.get('description')!.value;
    let nftSvc = this.nftService.nft.getValue();
    const signer = this.walletService.signer.getValue();
    nftSvc = nftSvc.connect(signer);
    try {
      const tx = await nftSvc.freeMint(this.address.getValue());
      console.log({ tx });
      const txDone = await tx.wait();
      console.log({ txDone });
    } catch (error) {
      console.log(error);
    }
    console.log({
      assets,
      name,
      description,
    });
  }
}

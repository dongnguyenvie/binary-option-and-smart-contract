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
  image: File;
  nftForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  dialog: any;
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
    this.dialog = this.dialogService.open(dialog, {
      // context: {
      //   title: 'This is a title passed to the dialog component',
      // },
    });
  }

  connectWalletPressed() {
    this.walletService.connectWallet();
  }

  onSelectFile(file: File) {
    console.warn('file selected', file);
    this.image = file;
  }

  async newNftItem() {
    if (!this.nftForm.valid) return;
    const name = this.nftForm.get('name')!.value;
    const description = this.nftForm.get('description')!.value;
    this.nftService
      .createNFT({
        description: description,
        name: name,
        image: this.image,
      })
      .subscribe(async (response: any) => {
        const url = `http://localhost:5000/api/nfts/${response.result.id}`;
        try {
          const signer = this.walletService.signer.getValue();
          let nftSvc = this.nftService.nft.getValue();
          nftSvc = nftSvc.connect(signer);
          const tx = await nftSvc.freeMint(this.address.getValue(), url);
          console.log({ tx });
          const txDone = await tx.wait();
          console.log({ txDone });
          alert('Mint successfully');
          !!this.dialog && this.dialog.close();
          this.nftService.refresh();
        } catch (error) {
          console.log(error);
        }
        console.log({
          name,
          description,
        });
      });
  }
}

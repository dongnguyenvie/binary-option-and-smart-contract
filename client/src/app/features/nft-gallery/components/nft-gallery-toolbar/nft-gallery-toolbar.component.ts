import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { ethers } from 'ethers';
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
  isPremium = false;
  isLoading = false

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

  openMintDialog(dialog: TemplateRef<any>, premium: boolean) {
    this.isPremium = premium;
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

  async mintPremiumNFT() {
    if (!this.nftForm.valid) return;
    this.isLoading = true

    const name = this.nftForm.get('name')!.value;
    const description = this.nftForm.get('description')!.value;
    const hhd = this.walletService.hhd.getValue();
    let nftSvc = this.nftService.nft.getValue();
    const signer = this.walletService.signer.getValue();
    nftSvc = nftSvc.connect(signer);

    const tx1 = await hhd.approve(
      nftSvc.address,
      ethers.utils.parseEther('0.1'),
    );
    console.warn('tx1', tx1);
    const tx1done = await tx1.wait();
    console.warn('tx1done', tx1done);

    this.nftService
      .createNFT({
        description: description,
        name: name,
        image: this.image,
      })
      .subscribe(async (response: any) => {
        const url = `http://localhost:5000/api/nfts/${response.result.id}`;
        try {
          const tx = await nftSvc.premiumMint(this.address.getValue(), url);
          console.log({ tx });
          const txDone = await tx.wait();
          console.log({ txDone });
          alert('Mint successfully');
          !!this.dialog && this.dialog.close();
          this.nftService.refresh();
          this.isLoading = false
        } catch (error) {
          console.log(error);
          this.isLoading = false
        }
        console.log({
          name,
          description,
        });
      });
  }

  async freeMintNFT() {
    if (!this.nftForm.valid) return;
    this.isLoading = true
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
          this.isLoading = false
        } catch (error) {
          console.log(error);
          this.isLoading = false
        }
        console.log({
          name,
          description,
        });
      });
  }
}

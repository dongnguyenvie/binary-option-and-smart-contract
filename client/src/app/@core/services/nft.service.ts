import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { ShopNFT } from '../contracts';
import { NFT } from '../interfaces/common';
import getBlockchain from '../libs/ethereum';

@Injectable({
  providedIn: 'root',
})
export class NftService {
  $nft = new BehaviorSubject<ShopNFT>(null as any);
  page = 0;

  _itemsPerPage = 10;

  constructor() {
    this.init();
  }

  async init() {
    const { nft } = await getBlockchain();
    this.$nft.next(nft!);
  }

  get nft() {
    return this.$nft;
  }

  get total() {
    return this.$nft.pipe(
      switchMap(nft => nft.currentCounter()),
      map(total => total.toNumber()),
    );
  }

  get pagination() {
    return this.total.pipe(
      map(total => {
        const start = Math.max(0, this.page - 1) * this._itemsPerPage + 1;
        let end = total;
        if (total > this._itemsPerPage) {
          end = this._itemsPerPage * this.page;
          if (end > total) {
            end = total;
          }
        }

        return {
          start,
          end,
          page: this.page,
          total: this.total,
        };
      }),
    );
  }

  get linkDatas() {
    return this.pagination.pipe(
      switchMap(pagination => {
        const nft = this.$nft.getValue();
        const promise = [];
        console.log({ pagination });
        for (let i = pagination.start; i < pagination.end; i++) {
          promise.push(nft.tokenURI(i));
        }
        return Promise.all(promise);
      }),
      tap(data => console.log(data)),
    );
  }

  get data() {
    return this.linkDatas.pipe(
      switchMap(links =>
        Promise.all(
          links.map(url => fetch(url).then(res => res.json() as Promise<NFT>)),
        ),
      ),
    );
  }
}

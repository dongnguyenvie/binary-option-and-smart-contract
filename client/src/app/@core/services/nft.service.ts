import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BigNumber } from '@ethersproject/bignumber';
import { BehaviorSubject, map, switchMap, tap, filter, Observable } from 'rxjs';
import { API } from '../config/api';
import { MarioGame } from '../contracts';
import { NFT } from '../interfaces/common';
import getBlockchain from '../libs/ethereum';

@Injectable({
  providedIn: 'root',
})
export class NftService {
  $nft = new BehaviorSubject<MarioGame>(null as any);
  $collects = new BehaviorSubject<NFT[]>([]);
  $total = new BehaviorSubject<number>(0);

  page = 0;

  _itemsPerPage = 10;

  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    const { marioNFT } = await getBlockchain();
    const nft = marioNFT!;
    this.$nft.next(nft);
    this.refresh();
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

  async refresh() {
    const nft = this.$nft.getValue();
    const total = (await nft!.currentCounter()).toNumber();
    const pagination = this.caculatePagination(total);
    this.fetchCollects(nft, total, pagination);
  }

  createNFT(
    payload: Required<Pick<NFT, 'name' | 'description'>> & { image: File },
  ): Observable<any> {
    console.log('payload', payload);
    const formData = new FormData();
    formData.append('image', payload.image);
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    return this.http.post(API.nft, formData, {
      headers: {
        'Content-Type': 'multipart',
      },
    });
  }

  caculatePagination(total: number) {
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
  }

  async fetchCollects(nft: MarioGame, total: number, pagination: any) {
    const tokenUriPromise = [];
    const attrsPromise = [];
    for (let i = pagination.start; i < pagination.end; i++) {
      tokenUriPromise.push(
        nft
          .tokenURI(i)
          .then(url =>
            fetch(url).then(res =>
              res.ok
                ? (res.json() as Promise<NFT>)
                : (null as unknown as Promise<NFT>),
            ),
          ),
      );
      attrsPromise.push(nft.attrsOf(i));
    }

    const tokenUris = await Promise.all(tokenUriPromise);
    const attrs = await Promise.all(attrsPromise);
    let results: any[] = [];
    tokenUris.forEach((nft, idx) => {
      if (!nft) return;
      results.push({
        ...nft,
        attrs: {
          level: attrs[idx].level.toNumber(),
          pump: attrs[idx].pump.toNumber(),
        },
      });
    });
    console.log({ results });
    this.$collects.next(results);
  }

  get pagination() {
    return this.$total.pipe(map(total => this.caculatePagination(total)));
  }

  get collects() {
    return this.$collects;
  }

  get linkDatas() {
    return this.pagination.pipe(
      switchMap(pagination => {
        const nft = this.$nft.getValue();
        const promise = [];
        for (let i = pagination.start; i < pagination.end; i++) {
          promise.push(nft.tokenURI(i));
        }
        return Promise.all(promise);
      }),
      tap(data => console.log(data)),
    );
  }

  get attributes() {
    return this.pagination.pipe(
      switchMap(pagination => {
        const nft = this.$nft.getValue();
        const promise = [];
        for (let i = pagination.start; i < pagination.end; i++) {
          promise.push(nft.attrsOf(i).then(result => [i, result]));
        }
        return Promise.all(promise);
      }),
      map(results => {
        const mapping: any = {};
        results.map(sprite => {
          const [tokenId, attribute] = sprite as [
            number,
            [BigNumber, BigNumber],
          ];

          const [level, pump] = attribute;
          mapping[tokenId] = [
            {
              trait_type: 'level',
              value: level.toNumber(),
            },
            {
              trait_type: 'pump',
              value: pump.toNumber(),
            },
          ];
        });
        return mapping;
      }),
      tap(data => console.log(data)),
    );
  }

  get data() {
    return this.linkDatas.pipe(
      switchMap(links =>
        Promise.all(
          links.map(url =>
            fetch(url).then(res =>
              res.ok
                ? (res.json() as Promise<NFT>)
                : (null as unknown as Promise<NFT>),
            ),
          ),
        ),
      ),
      map(results => results.filter(result => !!result)),
    );
  }
}

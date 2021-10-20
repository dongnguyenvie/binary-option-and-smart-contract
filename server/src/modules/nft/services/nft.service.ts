import { Injectable } from '@nestjs/common';
import NftRepository from '../repositories/nft.repository';

@Injectable()
export default class NftService {
  constructor(private nftRepo: NftRepository) {}

  async create(nft: any) {
    const newNft = this.nftRepo.create({
      ...nft,
    });
    const result = await this.nftRepo.save(newNft);
    return {
      result,
    };
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import NftRepository from '../repositories/nft.repository';
import { NFTStorage, File } from 'nft.storage';
import { NFT_IMAGE_STORAGE } from '../constants/nft.constant';
import { Status } from 'src/modules/shared/constants/common.contant';

@Injectable()
export default class NftService {
  constructor(private nftRepo: NftRepository, @Inject(NFT_IMAGE_STORAGE) private nftStorage: NFTStorage) {}

  async createNFT(nft: any, image: Express.Multer.File) {
    const metadata = await this.nftStorage.store({
      name: nft.name,
      description: nft.description,
      image: new File([image.buffer], nft.name, {
        type: image.mimetype,
      }),
    });
    const newNft = this.nftRepo.create({
      description: nft.description,
      name: nft.name,
      status: Status.ACTIVE,
      tokenId: 'xxx',
      image: `https://ipfs.io/ipfs/${metadata.data.image.host}/${nft.name}`,
      ipfs: metadata.url,
    });
    const result = await this.nftRepo.save(newNft);
    return {
      result,
    };
  }

  async getNFT(id: string) {
    try {
      const result = await this.nftRepo.findOne({ id: id });
      if (!result) throw '';
      return result;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

import { NFTStorage } from 'nft.storage';
import { NFT_IMAGE_STORAGE } from '../constants/nft.constant';
import { ConfigService } from '@nestjs/config';

const nftStorageProvider = {
  useFactory: (config: ConfigService) => {
    const instance = new NFTStorage({ token: config.get('NFT_STORAGE_KEY') });
    return instance;
  },
  provide: NFT_IMAGE_STORAGE,
  inject: [ConfigService],
};

export default nftStorageProvider;

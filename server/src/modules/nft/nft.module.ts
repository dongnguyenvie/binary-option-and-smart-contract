import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import NftController from './controlers/nft.controller';
import nftStorageProvider from './providers/nft-img-storage.provider';
import NftRepository from './repositories/nft.repository';
import NftService from './services/nft.service';

@Module({
  imports: [TypeOrmModule.forFeature([NftRepository])],
  providers: [NftService, nftStorageProvider],
  controllers: [NftController],
})
export default class NftModule {}

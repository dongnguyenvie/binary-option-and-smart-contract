import { Module } from '@nestjs/common';
import NftController from './controlers/nft.controller';
import NftService from './services/nft.service';

@Module({
  imports: [],
  providers: [NftService],
  controllers: [NftController],
})
export default class NftModule {}

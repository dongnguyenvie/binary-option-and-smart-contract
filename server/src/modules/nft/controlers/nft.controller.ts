import { Controller, Get, Param } from '@nestjs/common';
import NftService from '../services/nft.service';

@Controller('nfts')
export default class NftController {
  constructor(private nftSvc: NftService) {}

  @Get(':id')
  getNft(@Param('id') id: number) {
    return {
      attributes: [
        { trait_type: 'Shape', value: 'Circle' },
        { trait_type: 'Mood', value: 'Sad' },
      ],
      description: 'A sad circle.',
      image: 'http://localhost:5000/public/images/x1.png',
      name: 'Sad Circle',
      id: '1',
    };
  }
}

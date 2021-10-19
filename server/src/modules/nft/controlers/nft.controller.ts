import { Controller, Get, Param } from '@nestjs/common';
import NftService from '../services/nft.service';

@Controller('nfts')
export default class NftController {
  constructor(private nftSvc: NftService) {}

  @Get(':id')
  getNft(@Param('id') id: number) {
    return {
      attributes: [
        {
          trait_type: 'Shape',
          value: 'Circle',
        },
        {
          trait_type: 'Mood',
          value: 'Sad',
        },
      ],
      description: 'A sad circle.',
      image: 'https://i.imgur.com/Qkw9N0A.jpeg',
      name: 'Sad Circle',
      id: id,
    };
  }
}

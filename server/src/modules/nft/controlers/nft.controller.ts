import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import PoliciesGuard from 'src/modules/shared/guards/policies.guard';
import { CreateNftDTO } from '../dtos/create-nft.dto';
import NftService from '../services/nft.service';

@Controller('nfts')
export default class NftController {
  constructor(private nftSvc: NftService) {}

  @Get(':id')
  getNft(@Param('id') id: number) {
    // return {
    //   attributes: [],
    //   description: 'A sad circle.',
    //   image: 'http://localhost:5000/public/images/x1.png',
    //   name: 'Sad Circle',
    //   id: '1',
    //   tokenId: id,
    // };
    return this.nftSvc.getNFT(id);
  }

  @PoliciesGuard()
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createNFT(@UploadedFile() image: Express.Multer.File, @Body() nft: CreateNftDTO) {
    return this.nftSvc.createNFT(nft, image);
  }
}

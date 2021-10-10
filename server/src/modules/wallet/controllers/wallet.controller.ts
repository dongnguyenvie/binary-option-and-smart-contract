import { Body, Controller, Get, Post } from '@nestjs/common';
import CurrentUser from 'src/modules/shared/decorators/user.decorator';
import PoliciesGuard from 'src/modules/shared/guards/policies.guard';
import { CurrentUser as ICurrentUser } from 'src/modules/shared/interfaces/common.interface';
import CreateWalletDTO from '../dtos/create-wallet.dto';
import WalletService from '../servies/wallet.service';

@Controller('wallets')
export default class WalletController {
  constructor(private walletSvc: WalletService) {}

  @PoliciesGuard()
  @Get('/my-wallet')
  getMyWallet(@CurrentUser() currentUser: ICurrentUser) {
    return this.walletSvc.myWallet(currentUser);
  }

  //   @PoliciesGuard()
  //   @Post()
  //   createWallet(@Body() createWallet: CreateWalletDTO, @CurrentUser() currentUser: ICurrentUser) {
  //     return this.walletSvc.createWallet({
  //       userId: currentUser.id,
  //       address: createWallet.walletId,
  //       otp: createWallet.otp,
  //     });
  //   }
}

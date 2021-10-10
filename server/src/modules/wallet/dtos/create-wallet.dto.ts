import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateWalletDTO {
  @ApiProperty()
  @IsNotEmpty()
  walletId: string;

  @ApiProperty()
  @IsNotEmpty()
  otp: string;
}

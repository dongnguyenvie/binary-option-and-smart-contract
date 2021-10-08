import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BetType } from 'src/modules/shared/constants/common.contant';

export default class OrderStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsIn([BetType.BUY, BetType.SELL])
  betType: number;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // duration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  asset: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // status: number;
}

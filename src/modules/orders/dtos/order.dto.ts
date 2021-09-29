import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class OrderStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  betType: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  asset: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  status: number;
}

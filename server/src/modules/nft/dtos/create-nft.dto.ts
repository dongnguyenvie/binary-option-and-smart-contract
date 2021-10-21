import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isString } from 'class-validator';

export class CreateNftDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}

import { Controller, Get, Ip } from '@nestjs/common';

@Controller()
export default class AppController {
  @Get('ping')
  ping(@Ip() ip: string): string {
    return `pong ${ip}`;
  }
}

import { Controller, Get } from '@nestjs/common';

@Controller()
export default class AppController {
  @Get('ping')
  ping(): string {
    return 'pong';
  }
}

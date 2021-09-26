import { Controller, Get } from '@nestjs/common';

@Controller({
  path: 'user',
})
export default class UserController {
  @Get()
  getUsers() {
    return [];
  }
}

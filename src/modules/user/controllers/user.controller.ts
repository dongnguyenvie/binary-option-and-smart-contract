import { Controller, Get } from '@nestjs/common';
import UserService from '../servies/user.service';

@Controller('users')
export default class UserController {
  constructor(private userSvc: UserService) {}

  @Get()
  getUsers() {
    return this.userSvc.getUsers();
  }
}

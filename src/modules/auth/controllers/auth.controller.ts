import { Controller, Post, UseGuards, Get, Request, Body } from '@nestjs/common';
import LocalAuthGuard from 'src/modules/shared/guards/local-auth.guard';
import PoliciesGuard from 'src/modules/shared/guards/policies.guard';
import SignupDto from '../dto/signup.dto';
import AuthService from '../servies/auth.service';

@Controller()
export default class AuthController {
  constructor(private authSvc: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authSvc.signup(signupDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() req) {
    return this.authSvc.signin(req.user);
  }

  @PoliciesGuard()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

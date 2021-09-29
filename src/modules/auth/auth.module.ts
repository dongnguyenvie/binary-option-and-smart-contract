import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UserModule from '../user/user.module';
import AuthService from './servies/auth.service';
import AuthController from './controllers/auth.controller';
import LocalStrategy from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import TokenModule from '../shared/token/token.module';

@Module({
  imports: [UserModule, PassportModule, TokenModule],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [],
})
export default class AuthModule {}

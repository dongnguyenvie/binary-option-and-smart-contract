import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UserModule from '../user/user.module';
import AuthService from './servies/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AuthController from './controllers/auth.controller';
import LocalStrategy from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        const secret = config.get('JWT_SECRET');
        const expiresIn = config.get('JWT_EXPIRES_IN') || 86400;

        return {
          secret: secret,
          signOptions: { expiresIn: +expiresIn },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [],
})
export default class AuthModule {}

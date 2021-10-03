import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserService from 'src/modules/user/servies/user.service';
import { Signup } from '../interface';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/modules/shared/constants/system.constant';
import { EventEmitter2 } from 'eventemitter2';
import SyncWalletToMemoryEvent from 'src/modules/shared/events/sync-wallet-to-memory-event';
import { walletEvent } from 'src/modules/shared/constants/event.constant';

@Injectable()
export default class AuthService {
  constructor(
    private userSvc: UserService,
    private jwtSvc: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const userLogon = await this.userSvc.findOneByEmail(email);

    if (userLogon) {
      const isPassValid = await bcrypt.compare(password, userLogon.password);
      if (isPassValid) {
        const { password, ...result } = userLogon;
        return result;
      }
      return null;
    }
    return null;
  }

  async createToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtSvc.sign(payload),
    };
  }

  async signin(user: any) {
    const { accessToken } = await this.createToken(user);
    this.eventEmitter.emit(
      walletEvent.SYNC_WALLET_TO_MEMORY,
      new SyncWalletToMemoryEvent({ userId: user.id }),
    );

    return {
      accessToken,
    };
  }

  async signup(user: Signup) {
    const userFound = await this.userSvc.findOneByEmail(user.email);
    if (userFound) return new BadRequestException('Email is exists');
    user.password = await bcrypt.hash(user.password, saltOrRounds);
    const result = await this.userSvc.createUser(user);
    const { accessToken } = await this.createToken(result);

    return {
      accessToken,
    };
  }
}

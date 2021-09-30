import { OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Socket, Server } from 'socket.io';
import { futureEvent } from 'src/modules/shared/constants/event.constant';
import BettingEvent from 'src/modules/shared/events/betting.event';

@WebSocketGateway({ namespace: '/future', cors: true })
export default class FutureGateway implements NestGateway {
  constructor(private jwtService: JwtService) {}

  @WebSocketServer() server: Server;

  public afterInit(server: Server): void {}

  @SubscribeMessage('authorization')
  public authorization(client: Socket, token: string): void {
    const isAuth = this.jwtService.verify(token);
    if (!isAuth) {
      client.disconnect();
      return;
    }
    const user = this.jwtService.decode(token) as any;
    client.handshake.auth.isVerify = true;
    client.handshake.auth.user = user;
    client.join(user.id);
    process.nextTick(async () => {
      client.emit('verification', user);
    });
  }

  public handleDisconnect(client: Socket): void {
    // return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    // return this.logger.log(`Client connected: ${client.id}`);
  }

  public handleEmitBetResult(payload: BettingEvent) {
    return this.server.to(payload.userId).emit('bet-results', payload);
  }

  @OnEvent(futureEvent.BET_RESULT)
  streamingDataReceiver(payload: BettingEvent) {
    this.handleEmitBetResult(payload);
  }
}

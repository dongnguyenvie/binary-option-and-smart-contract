import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { map } from 'rxjs';
import { Socket, Server } from 'socket.io';
import DataFeedService from 'src/modules/data-feed/services/data-feed.service';

@WebSocketGateway({ namespace: '/future' })
export default class FutureGateway implements NestGateway {
  constructor(private readonly datafeedSvc: DataFeedService) {}

  @WebSocketServer() server: Server;

  public afterInit(server: Server): void {
    this.datafeedSvc.fromStream().subscribe((candles) => {
      server.emit('datafeed', candles);
    });
  }

  @SubscribeMessage('authorization') //symbolSub
  public authorization(client: Socket, token: string): void {
    // if (!apiKey || !this.apiKeys[apiKey]) {
    //   client.emit('unauthenticated', {
    //     message: 'authencation unsuccessfully',
    //   });
    //   client.disconnect();
    //   return;
    // }
    // client.handshake.auth.isVerify = true;
    // client.emit('authenticated', { message: 'authencation successfully' });
  }

  public handleDisconnect(client: Socket): void {
    // return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    // return this.logger.log(`Client connected: ${client.id}`);
  }
}

import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { map } from 'rxjs';
import { Socket, Server } from 'socket.io';
import DataFeedService from 'src/modules/data-feed/services/data-feed.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@WebSocketGateway({ namespace: '/future' })
export class FutureGateway implements NestGateway {
  constructor(
    private readonly datafeedSvc: DataFeedService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  @WebSocketServer() server: Server;

  public afterInit(server: Server): void {
    this.cache.set('dong', 'test');
    this.datafeedSvc
      .fromStream()
      .pipe(
        map((data) => {
          return Object.entries(data.chart || {});
        }),
      )
      .subscribe((dataStreamming) => {
        server.emit('datafeed', dataStreamming);
      });
  }

  @SubscribeMessage('authorization') //symbolSub
  public authorization(client: Socket, apiKey: string): void {
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

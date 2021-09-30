import { JwtService } from '@nestjs/jwt';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { map } from 'rxjs';
import { Socket, Server } from 'socket.io';
import DataFeedService from 'src/modules/data-feed/services/data-feed.service';

@WebSocketGateway({ namespace: '/data-future' })
export default class FutureGateway implements NestGateway {
  constructor(private readonly datafeedSvc: DataFeedService, private jwtService: JwtService) {}

  @WebSocketServer() server: Server;

  public afterInit(server: Server): void {
    this.datafeedSvc.fromStream().subscribe((candles) => {
      server.emit('datafeed', candles);
    });
  }

  public handleDisconnect(client: Socket): void {
    // return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    // return this.logger.log(`Client connected: ${client.id}`);
  }
}
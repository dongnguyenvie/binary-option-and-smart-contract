import { OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Socket, Server } from 'socket.io';
import DataFeedService from 'src/modules/data-feed/services/data-feed.service';
import { futureEvent } from 'src/modules/shared/constants/event.constant';
import PublicOrderEvent from 'src/modules/shared/events/public-order.event';
import dayjs from 'src/modules/shared/helpers/dayjs';
import { Order } from '../interfaces';

@WebSocketGateway({ namespace: '/data-future', cors: true })
export default class DataFutureGateway implements NestGateway {
  constructor(private readonly datafeedSvc: DataFeedService, private jwtService: JwtService) {}

  @WebSocketServer() server: Server;

  public afterInit(server: Server): void {
    this.datafeedSvc.fromStream().subscribe((candles) => {
      server.emit('datafuture:datafeed', candles);
    });
    setInterval(() => {
      const orderTime = dayjs().startOf('minute').unix();
      const canOrder = isCanOrder(orderTime);
      if (!canOrder) return;
      server.emit('datafuture:orders', {
        username: `bot_${Math.floor(1000 * Math.random())}`,
        amount: Math.floor(1000 * Math.random()),
        betType: Math.max(1, Math.floor(Math.random() * 3)),
      });
    }, 3000);
  }

  public handleDisconnect(client: Socket): void {
    // return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    // return this.logger.log(`Client connected: ${client.id}`);
  }

  emitOrder(order: Order) {
    this.server.emit('datafuture:orders', order);
  }

  @OnEvent(futureEvent.PUBLIC_ORDER)
  publicOrdersListener(payload: PublicOrderEvent) {
    this.emitOrder(payload);
  }
}

function isCanOrder(time: number) {
  return (time / 60) % 2 === 0;
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitter2 } from 'eventemitter2';
import { BettingStateService } from 'src/modules/shared/betting-state/betting-state.service';
import { OrderStatus } from 'src/modules/shared/constants/common.contant';
import { orderEvent, transactionEvent } from 'src/modules/shared/constants/event.constant';
import ResolveBetOrderEvent from 'src/modules/shared/events/resolve-bet-order.event';
import dayjs from 'src/modules/shared/helpers/dayjs';
import { MemoryCacheService } from 'src/modules/shared/memory-cache/memory-cache.service';
import { ORDER_DURATION } from '../constants/order.constant';
import { CreateOrder, CreateOrderTransaction, UpdateOrder } from '../interfaces/order.interface';
import OrderRepository from '../repositories/order.repository';

@Injectable()
export default class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private eventEmitter: EventEmitter2,
    private bettingStateSvc: BettingStateService,
    private cacheSvc: MemoryCacheService,
  ) {}

  emitCreateNewOrder(order: CreateOrderTransaction) {
    this.eventEmitter.emit(transactionEvent.CREATE_BET_TRANSACTION, order);
  }

  async createOrder(payload: CreateOrder) {
    const orderTime = dayjs().startOf('minute').unix();
    const canOrder = isCanOrder(orderTime);
    if (!canOrder) {
      return new BadRequestException('Cannot order');
    }

    const wallet = await this.cacheSvc.getWallet(payload.userId);
    if (payload.amount < 0 || payload.amount - wallet.balance > 0) {
      return new BadRequestException('out of money');
    }

    const openTime = orderTime + 60;
    const { amount, betType, asset, userId } = payload;

    const newOrder = this.orderRepo.create({
      amount,
      betType,
      openTime,
      status: OrderStatus.WAITING,
      duration: ORDER_DURATION,
      userId: userId,
      asset: asset,
    });
    const result = await this.orderRepo.save(newOrder);

    this.bettingStateSvc.set(result.id, {
      betType: result.betType,
      amount: result.amount,
      openTime: result.openTime,
      userId: result.userId,
      orderId: result.id,
    });

    return {
      id: result.id,
    };
  }

  async updateOrderResult(payload: UpdateOrder) {
    this.orderRepo.update(
      { id: payload.orderId },
      {
        status: payload.status,
        profit: payload.profit,
      },
    );
  }

  @OnEvent(orderEvent.RESOLVE_BET)
  betResultEventListener(payload: ResolveBetOrderEvent) {
    this.updateOrderResult(payload);
  }
}

function isCanOrder(time: number) {
  return (time / 60) % 2 === 0;
}

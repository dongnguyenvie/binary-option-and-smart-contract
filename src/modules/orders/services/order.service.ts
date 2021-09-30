import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { BettingStateService } from 'src/modules/shared/betting-state/betting-state.service';
import { BetType, OrderStatus, WalletStatus } from 'src/modules/shared/constants/common.contant';
import { transactionEvent } from 'src/modules/shared/constants/event.constant';
import dayjs from 'src/modules/shared/helpers/dayjs';
import { ORDER_DURATION } from '../constants/order.constant';
import { CreateOrder, CreateOrderTransaction } from '../interfaces/order.interface';
import OrderRepository from '../repositories/order.repository';

@Injectable()
export default class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private eventEmitter: EventEmitter2,
    private bettingStateSvc: BettingStateService,
  ) {}

  emitCreateNewOrder(order: CreateOrderTransaction) {
    this.eventEmitter.emit(transactionEvent.CREATE_BET_TRANSACTION, order);
  }

  async createOrder(payload: CreateOrder) {
    const orderTime = dayjs().startOf('minute').unix();
    const isAllow = (orderTime / 60) % 2 === 0;
    if (!isAllow) {
      return new BadRequestException('Cannot order');
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
    });

    return {
      id: result.id,
    };
  }
}

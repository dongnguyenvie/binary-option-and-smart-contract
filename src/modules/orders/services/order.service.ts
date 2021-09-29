import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { BettingStateService } from 'src/modules/shared/betting-state/betting-state.service';
import { WalletStatus } from 'src/modules/shared/constants/common.contant';
import { transactionEvent } from 'src/modules/shared/constants/event.constant';
import dayjs from 'src/modules/shared/helpers/dayjs';
import { CurrentUser } from 'src/modules/shared/interfaces/common.interface';
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

  async createOrder(order: CreateOrder) {
    const orderTime = dayjs().startOf('minute').unix();
    const isAllow = (orderTime / 60) % 2 === 0;
    if (!isAllow) {
      return new BadRequestException('Cannot order');
    }
    const openTime = orderTime + 60;
    const newOrder = this.orderRepo.create(order);
    const result = await this.orderRepo.save({ ...newOrder, openTime });
    console.log('result', result);
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

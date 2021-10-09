import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EventEmitter2 } from 'eventemitter2';
import { BetResult, OrderStatus } from 'src/modules/shared/constants/common.contant';
import { futureEvent, orderEvent, transactionEvent } from 'src/modules/shared/constants/event.constant';
import BetResultEvent from 'src/modules/shared/events/betting.event';
import CreateBetTransactionEvent from 'src/modules/shared/events/create-bet-transaction.event';
import ResolveBetOrderEvent from 'src/modules/shared/events/resolve-bet-order.event';
import BetCalculateJob from 'src/modules/shared/jobs/bet-caculate.job';
import { MemoryCacheService } from 'src/modules/shared/memory-cache/memory-cache.service';
import { BET_CALCULATOR, CALCULATE_BET } from '../constants/future.constant';

@Processor(BET_CALCULATOR)
export default class BetProcessor {
  constructor(private eventEmitter: EventEmitter2, private memorycacheSvc: MemoryCacheService) {}

  // @OnQueueActive()
  // onActive(job: Job) {
  //   console.log(
  //     `Processor:@OnQueueActive - Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
  //       job.data,
  //     )}`,
  //   );
  // }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(`Processor:@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`);
  }

  @OnQueueFailed()
  onError(job: Job<any>, error) {
    console.log(
      `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process(CALCULATE_BET)
  async calculateBet(job: Job<BetCalculateJob>): Promise<any> {
    console.log('Processor:@Process - caculate bet.');
    const bettor = job.data;

    try {
      const profit = bettor.betResult === BetResult.WIN ? (bettor.amount * 80) / 100 : -bettor.amount;

      this.eventEmitter.emit(
        futureEvent.BET_RESULT,
        new BetResultEvent({
          profit: profit,
          betResult: bettor.betResult,
          userId: bettor.userId,
        }),
      );

      this.eventEmitter.emit(
        orderEvent.RESOLVE_BET,
        new ResolveBetOrderEvent({
          status: bettor.betResult === BetResult.WIN ? OrderStatus.WON : OrderStatus.LOST,
          profit: profit,
          orderId: bettor.orderId,
          userId: bettor.userId,
          walletId: 'xxxx',
        }),
      );

      const wallet = await this.memorycacheSvc.getWallet(bettor.userId);
      wallet.balance = wallet.balance + +profit;

      this.memorycacheSvc.setWallet(bettor.userId, wallet);

      this.eventEmitter.emit(
        transactionEvent.CREATE_BET_TRANSACTION,
        new CreateBetTransactionEvent({
          profit: profit,
          orderId: bettor.orderId,
          walletId: wallet.id,
          userId: bettor.userId,
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}

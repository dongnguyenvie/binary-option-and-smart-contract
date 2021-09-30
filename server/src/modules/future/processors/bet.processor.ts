import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EventEmitter2 } from 'eventemitter2';
import { BetResult } from 'src/modules/shared/constants/common.contant';
import { futureEvent } from 'src/modules/shared/constants/event.constant';
import BetResultEvent from 'src/modules/shared/events/betting.event';
import BetCalculateJob from 'src/modules/shared/jobs/bet-caculate.job';
import { BET_CALCULATOR, CALCULATE_BET } from '../constants/future.constant';

@Processor(BET_CALCULATOR)
export default class BetProcessor {
  constructor(private eventEmitter: EventEmitter2) {}

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
      // TODO: working with order service, update order, creatr transaction
      // if (bettor.betResult === BetResult.WIN) {
      // }
      const amount = bettor.betResult === BetResult.WIN ? (bettor.amount * 80) / 100 : bettor.amount;
      this.eventEmitter.emit(
        futureEvent.BET_RESULT,
        new BetResultEvent({
          amount: amount,
          betResult: bettor.betResult,
          userId: bettor.userId,
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}

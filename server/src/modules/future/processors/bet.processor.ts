import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BET_CALCULATOR, CALCULATE_BET } from '../constants/future.constant';

@Processor(BET_CALCULATOR)
export default class BetProcessor {
  constructor() {}

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processor:@OnQueueActive - Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

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
  async calculateBet(job: Job<any>): Promise<any> {
    console.log('Processor:@Process - caculate bet.');
    const bettor = job.data;

    try {
    } catch (error) {
      throw error;
    }
  }
}

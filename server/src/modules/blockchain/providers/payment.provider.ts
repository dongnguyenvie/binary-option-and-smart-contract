import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { PAYMENT_CONTRACT } from '../constants/blockchain.constant';
import * as HHDPaymentProcessorABI from '../constracts/HHDPaymentProcessor.constant.json';

const paymentProvider: Provider = {
  useFactory: (config: ConfigService): ethers.Contract => {
    const paymentAddress = config.get('PAYMENT_CONTRACT_ADDRESS');

    const infuraProvider = new ethers.providers.InfuraProvider(config.get('INFURA_NETWORK'), {
      projectId: config.get('INFURA_PROJECT_ID'),
      projectSecret: config.get('INFURA_PROJECT_SECRET'),
    });

    const paymentContract = new ethers.Contract(paymentAddress, HHDPaymentProcessorABI, infuraProvider);

    return paymentContract;
  },
  provide: PAYMENT_CONTRACT,
  inject: [ConfigService],
};

export default paymentProvider;

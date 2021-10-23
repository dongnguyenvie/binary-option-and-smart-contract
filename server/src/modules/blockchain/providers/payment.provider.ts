import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { PAYMENT_CONTRACT } from '../constants/blockchain.constant';
import { HHDPaymentProcessor__factory } from '../contracts';

const paymentProvider: Provider = {
  useFactory: (config: ConfigService): ethers.Contract => {
    const paymentAddress = config.get('PAYMENT_CONTRACT_ADDRESS');

    const network = config.get('INFURA_NETWORK');

    let provider: ethers.providers.InfuraProvider;
    if (network !== 'ganache') {
      provider = new ethers.providers.InfuraProvider(config.get('INFURA_NETWORK'), {
        projectId: config.get('INFURA_PROJECT_ID'),
        projectSecret: config.get('INFURA_PROJECT_SECRET'),
      });
    }

    if (network === 'ganache') {
      provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545') as any;
    }

    const paymentContract = HHDPaymentProcessor__factory.connect(paymentAddress, provider);

    return paymentContract;
  },
  provide: PAYMENT_CONTRACT,
  inject: [ConfigService],
};

export default paymentProvider;

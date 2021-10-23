import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { HHDPaymentProcessor__factory } from 'src/modules/shared/contracts';
import { PAYMENT_CONTRACT } from '../constants/blockchain.constant';

const paymentProvider: Provider = {
  useFactory: (config: ConfigService): ethers.Contract => {
    const paymentAddress = config.get('PAYMENT_CONTRACT_ADDRESS');

    const network = config.get('INFURA_NETWORK') as string;

    let provider: ethers.providers.InfuraProvider;

    if (network.startsWith('http')) {
      provider = new ethers.providers.JsonRpcProvider(network) as ethers.providers.InfuraProvider;
    } else {
      provider = new ethers.providers.InfuraProvider(config.get('INFURA_NETWORK'), {
        projectId: config.get('INFURA_PROJECT_ID'),
        projectSecret: config.get('INFURA_PROJECT_SECRET'),
      });
    }

    const paymentContract = HHDPaymentProcessor__factory.connect(paymentAddress, provider);

    return paymentContract;
  },
  provide: PAYMENT_CONTRACT,
  inject: [ConfigService],
};

export default paymentProvider;

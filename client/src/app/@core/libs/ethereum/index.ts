import { ethers, Contract } from 'ethers';
import {
  HHD_ADDRESS,
  HHD_FAUCET_ADDRESS,
  HHD_PAYMENT_PROCESSOR_ADDRESS,
} from '../../config/contract';
import { HHDContract } from '../../contracts/HHD.contract';
import { HHDFaucetContract } from '../../contracts/HHDFaucet.contract';
import { HHDPaymentProcessorContract } from '../../contracts/HHDPaymentProcessor.contract';

interface GetBlockchain {
  provider: ethers.providers.Web3Provider;
  paymentProcessor: ethers.Contract;
  hhd: ethers.Contract;
  hhdFaucet: ethers.Contract;
}
const getBlockchain = (): Promise<Partial<GetBlockchain>> =>
  new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const signerAddress = await signer.getAddress();
      // console.warn('signerAddress', signerAddress);

      //! payment => deposit a wallet
      const paymentProcessor = new Contract(
        HHD_PAYMENT_PROCESSOR_ADDRESS,
        HHDPaymentProcessorContract,
      );

      //! HHD coin
      const hhd = new Contract(
        HHD_ADDRESS, //for mainnet and public testnet replace by address of already deployed dai token
        HHDContract,
      );

      //! HHD Faucet => get free token
      const hhdFaucet = new Contract(
        HHD_FAUCET_ADDRESS, //for mainnet and public testnet replace by address of already deployed dai token
        HHDFaucetContract,
      );

      console.warn('hhd coin:', hhd);
      console.warn('hhdFaucet coin:', hhdFaucet);
      console.warn('paymentProcessor coin:', paymentProcessor);
      resolve({ provider, paymentProcessor, hhd, hhdFaucet });
    }

    resolve({
      provider: undefined,
      paymentProcessor: undefined,
      hhd: undefined,
      hhdFaucet: undefined,
    });
  });

export default getBlockchain;

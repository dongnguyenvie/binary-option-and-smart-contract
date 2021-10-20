import { ethers, Contract } from 'ethers';
import {
  HHD_ADDRESS,
  HHD_FAUCET_ADDRESS,
  HHD_PAYMENT_PROCESSOR_ADDRESS,
  NFT_ADDRESS,
} from '../../config/contract';
import {
  HHD,
  HHDFaucet,
  HHDFaucet__factory,
  HHDPaymentProcessor,
  HHDPaymentProcessor__factory,
  HHD__factory,
  ShopNFT,
  ShopNFT__factory,
} from '../../contracts';

ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.WARNING);
interface GetBlockchain {
  provider: ethers.providers.Web3Provider;
  paymentProcessor: HHDPaymentProcessor;
  hhd: HHD;
  hhdFaucet: HHDFaucet;
  signer: ethers.providers.JsonRpcSigner;
  nft: ShopNFT;
}
const getBlockchain = (): Promise<Partial<GetBlockchain>> =>
  new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      // await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const signerAddress = await signer.getAddress();
      // console.warn('signerAddress', signerAddress);

      //! payment => deposit a wallet
      const paymentProcessor = HHDPaymentProcessor__factory.connect(
        HHD_PAYMENT_PROCESSOR_ADDRESS,
        provider,
      );
      // const paymentProcessor = new Contract(
      //   HHD_PAYMENT_PROCESSOR_ADDRESS,
      //   xxx,
      //   signer,
      // );

      //! HHD coin
      const hhd = HHD__factory.connect(HHD_ADDRESS, provider);
      // const hhd = new Contract(
      //   HHD_ADDRESS, //for mainnet and public testnet replace by address of already deployed dai token
      //   HHDContract,
      //   signer,
      // );

      //! HHD Faucet => get free token
      const hhdFaucet = HHDFaucet__factory.connect(
        HHD_FAUCET_ADDRESS,
        provider,
      );
      // const hhdFaucet = new Contract(
      //   HHD_FAUCET_ADDRESS, //for mainnet and public testnet replace by address of already deployed dai token
      //   HHDFaucetContract,
      //   signer,
      // );

      //! NFT contract
      const nft = ShopNFT__factory.connect(NFT_ADDRESS, provider);

      console.warn('hhd coin:', hhd);
      console.warn('hhdFaucet coin:', hhdFaucet);
      console.warn('paymentProcessor coin:', paymentProcessor);
      console.warn('nft shop:', nft);
      resolve({ provider, paymentProcessor, hhd, hhdFaucet, signer, nft });
      (window as any).nolan = {
        nft,
        hhdFaucet,
        paymentProcessor,
        hhd,
      };
    }

    resolve({
      provider: undefined,
      paymentProcessor: undefined,
      hhd: undefined,
      hhdFaucet: undefined,
      nft: undefined,
    });
  });

export default getBlockchain;

import { AbiItem } from 'web3-utils';

export const HHD_Faucet_ADRESS = '0xe47dB4cC910611CcA4AAfF6FCAf79182FAF6189a';

export const HHD_Faucet_ABI: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'Token',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'giveToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token_HHD',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token_USDT',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

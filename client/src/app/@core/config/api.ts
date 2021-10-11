import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/api';

export const API = {
  login: `${BACKEND_URL}/signin`,
  register: `${BACKEND_URL}/signup`,
  profile: `${BACKEND_URL}/profile`,
  order: `${BACKEND_URL}/orders`,
  wallet: `${BACKEND_URL}/wallets`,
};

export const WALLET_CONNECT_STATUS = 'connectorIdv2';

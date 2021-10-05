import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/api';
export const API = {
  LOGIN: `${BACKEND_URL}/signin`,
  REGISTER: `${BACKEND_URL}/signup`,
};

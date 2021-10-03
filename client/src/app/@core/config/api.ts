import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;
export const API = {
  LOGIN: `${BACKEND_URL}/signin`,
  REGISTER: `${BACKEND_URL}/signup`,
};

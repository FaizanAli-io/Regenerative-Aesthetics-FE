import appConfig from '@/app.config';
import axios, { CanceledError } from 'axios';
import { getToken } from '../auth';

const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
});

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
export { CanceledError };

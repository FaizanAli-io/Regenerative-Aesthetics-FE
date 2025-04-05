import appConfig from '@/app.config';
import axios, { CanceledError } from 'axios';

export default axios.create({
  baseURL: appConfig.apiBaseUrl,
});

export { CanceledError };

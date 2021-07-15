import axios from 'axios';

export const scannerApi = axios.create({
  baseURL: 'http://10.11.26.5:3333',
});

export const sicoobServicosApi = axios.create({
  baseURL: 'http://10.11.26.3/api',
});

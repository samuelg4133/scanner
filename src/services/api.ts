import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.11.26.3/api',
});

export default api;

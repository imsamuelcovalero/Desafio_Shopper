import axios from 'axios';

/* url base para as requisições */
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export default api;

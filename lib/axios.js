import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecommerce.routemisr.com',
});

export default api;
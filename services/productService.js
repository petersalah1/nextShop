import api from '@/lib/axios'

export async function getProducts() {
  const response = await api.get('/api/v1/products');

  return response.data;
}
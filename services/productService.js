import api from '@/lib/axios'

export async function getProducts(params = {}) {
  const response = await api.get('/api/v1/products', {
    params,
  });

  return response.data;
}

export async function getProductDetails(productId) {
  const response = await api.get(`/api/v1/products/${productId}`);

  return response.data.data;
}
import api from '@/lib/axios';

export async function getBrands() {
  const response = await api.get('/api/v1/brands');

  return response.data;
}

export async function getBrandDetails(brandId) {
  const response = await api.get(`/api/v1/brands/${brandId}`);

  return response.data.data;
}

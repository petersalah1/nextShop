import api from '@/lib/axios'

export async function getCategories() {
  const response = await api.get('/api/v1/categories');

  return response.data.data;
}
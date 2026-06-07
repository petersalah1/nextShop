import api from '@/lib/axios';

export async function loginUser(credentials) {
  const response = await api.post('/api/v1/auth/signin', credentials);

  return response.data;
}

export async function registerUser(userData) {
  const response = await api.post('/api/v1/auth/signup', userData);

  return response.data;
}
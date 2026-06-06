import api from '@/lib/axios';

function getAuthHeaders(token) {
  return {
    headers: {
      token,
    },
  };
}

export async function getLoggedUserCart(token) {
  const response = await api.get('/api/v1/cart', getAuthHeaders(token));

  return response.data;
}

export async function addProductToCart({ productId, token }) {
  const response = await api.post(
    '/api/v1/cart',
    {
      productId,
    },
    getAuthHeaders(token)
  );

  return response.data;
}

export async function updateCartItemQuantity({ productId, count, token }) {
  const response = await api.put(
    `/api/v1/cart/${productId}`,
    {
      count,
    },
    getAuthHeaders(token)
  );

  return response.data;
}

export async function removeSpecificCartItem({ productId, token }) {
  const response = await api.delete(
    `/api/v1/cart/${productId}`,
    getAuthHeaders(token)
  );

  return response.data;
}

export async function clearUserCart(token) {
  const response = await api.delete('/api/v1/cart', getAuthHeaders(token));

  return response.data;
}
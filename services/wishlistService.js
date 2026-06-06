import api from '@/lib/axios';

function getAuthHeaders(token) {
  return {
    headers: {
      token,
    },
  };
}

export async function getLoggedUserWishlist(token) {
  const response = await api.get('/api/v1/wishlist', getAuthHeaders(token));

  return response.data;
}

export async function addProductToWishlist({ productId, token }) {
  const response = await api.post(
    '/api/v1/wishlist',
    {
      productId,
    },
    getAuthHeaders(token)
  );

  return response.data;
}

export async function removeProductFromWishlist({ productId, token }) {
  const response = await api.delete(
    `/api/v1/wishlist/${productId}`,
    getAuthHeaders(token)
  );

  return response.data;
} 
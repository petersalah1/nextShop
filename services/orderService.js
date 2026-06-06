import api from '@/lib/axios';

function getAuthHeaders(token) {
  return {
    headers: {
      token,
    },
  };
}

export async function createCashOrder({ cartId, shippingAddress, token }) {
  const response = await api.post(
    `/api/v1/orders/${cartId}`,
    {
      shippingAddress,
    },
    getAuthHeaders(token)
  );

  return response.data;
}

export async function createCheckoutSession({
  cartId,
  shippingAddress,
  token,
  redirectUrl,
}) {
  const response = await api.post(
    `/api/v1/orders/checkout-session/${cartId}`,
    {
      shippingAddress,
    },
    {
      headers: {
        token,
      },
      params: {
        url: redirectUrl,
      },
    }
  );

  return response.data;
}

export async function getUserOrders({ userId, token }) {
  const response = await api.get(
    `/api/v1/orders/user/${userId}`,
    getAuthHeaders(token)
  );

  return response.data;
}
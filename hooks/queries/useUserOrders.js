import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';

function getUserIdFromToken(token) {
  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];

    if (!payload) {
      return null;
    }

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '='
    );

    const decodedPayload = JSON.parse(atob(paddedBase64));

    return decodedPayload.id || decodedPayload._id || decodedPayload.userId;
  } catch {
    return null;
  }
}

export function useUserOrders() {
  const { token } = useAuth();
  const userId = getUserIdFromToken(token);

  return useQuery({
    queryKey: ['orders', userId],
    queryFn: () =>
      getUserOrders({
        userId,
        token,
      }),
    enabled: Boolean(token && userId),
  });
}
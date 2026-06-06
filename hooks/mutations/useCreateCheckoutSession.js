import { useMutation } from '@tanstack/react-query';
import { createCheckoutSession } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';

export function useCreateCheckoutSession() {
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ cartId, shippingAddress, redirectUrl }) =>
      createCheckoutSession({
        cartId,
        shippingAddress,
        redirectUrl,
        token,
      }),
  });
}
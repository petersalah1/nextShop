import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCashOrder } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';

export function useCreateCashOrder() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ cartId, shippingAddress }) =>
      createCashOrder({
        cartId,
        shippingAddress,
        token,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart', token],
      });
    },
  });
}
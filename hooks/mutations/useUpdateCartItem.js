import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCartItemQuantity } from '@/services/cartService';
import { useAuth } from '@/contexts/AuthContext';

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ productId, count }) =>
      updateCartItemQuantity({
        productId,
        count,
        token,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart', token],
      });
    },
  });
}
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeSpecificCartItem } from '@/services/cartService';
import { useAuth } from '@/contexts/AuthContext';

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (productId) =>
      removeSpecificCartItem({
        productId,
        token,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart', token],
      });
    },
  });
}
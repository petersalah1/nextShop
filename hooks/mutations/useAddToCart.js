import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProductToCart } from '@/services/cartService';
import { useAuth } from '@/contexts/AuthContext';

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (productId) =>
      addProductToCart({
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
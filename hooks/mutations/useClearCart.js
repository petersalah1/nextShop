import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clearUserCart } from '@/services/cartService';
import { useAuth } from '@/contexts/AuthContext';

export function useClearCart() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: () => clearUserCart(token),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart', token],
      });
    },
  });
}
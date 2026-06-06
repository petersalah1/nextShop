import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeProductFromWishlist } from '@/services/wishlistService';
import { useAuth } from '@/contexts/AuthContext';

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (productId) =>
      removeProductFromWishlist({
        productId,
        token,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['wishlist', token],
      });
    },
  });
}
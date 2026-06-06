import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProductToWishlist } from '@/services/wishlistService';
import { useAuth } from '@/contexts/AuthContext';

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (productId) =>
      addProductToWishlist({
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
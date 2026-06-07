import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeProductFromWishlist } from '@/services/wishlistService';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage } from '@/lib/getErrorMessage';

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
      queryClient.invalidateQueries({ queryKey: ['wishlist', token] });
      toast.success('Product removed from wishlist.');
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not remove product from wishlist.'));
    },
  });
}

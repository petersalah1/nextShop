import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addProductToWishlist } from '@/services/wishlistService';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage } from '@/lib/getErrorMessage';

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
      queryClient.invalidateQueries({ queryKey: ['wishlist', token] });
      toast.success('Product added to wishlist.');
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not add product to wishlist.'));
    },
  });
}

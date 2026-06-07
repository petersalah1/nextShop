import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeSpecificCartItem } from '@/services/cartService';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage } from '@/lib/getErrorMessage';

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
      queryClient.invalidateQueries({ queryKey: ['cart', token] });
      toast.success('Product removed from cart.');
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not remove product from cart.'));
    },
  });
}

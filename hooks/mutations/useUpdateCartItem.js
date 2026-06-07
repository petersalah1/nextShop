import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCartItemQuantity } from '@/services/cartService';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage } from '@/lib/getErrorMessage';

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
      queryClient.invalidateQueries({ queryKey: ['cart', token] });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not update cart item.'));
    },
  });
}

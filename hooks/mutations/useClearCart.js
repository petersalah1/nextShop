import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { clearUserCart } from '@/services/cartService';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage } from '@/lib/getErrorMessage';

export function useClearCart() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: () => clearUserCart(token),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', token] });
      toast.success('Cart cleared.');
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not clear cart.'));
    },
  });
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addProductToCart } from '@/services/cartService';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage } from '@/lib/getErrorMessage';

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
      queryClient.invalidateQueries({ queryKey: ['cart', token] });
      toast.success('Product added to cart.');
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not add product to cart.'));
    },
  });
}

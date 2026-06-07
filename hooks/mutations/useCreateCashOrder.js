import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCashOrder } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage } from '@/lib/getErrorMessage';

export function useCreateCashOrder() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ cartId, shippingAddress }) =>
      createCashOrder({
        cartId,
        shippingAddress,
        token,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', token] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order created successfully.');
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not create order.'));
    },
  });
}

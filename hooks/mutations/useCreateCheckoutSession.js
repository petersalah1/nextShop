import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCheckoutSession } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';
import { getErrorMessage } from '@/lib/getErrorMessage';

export function useCreateCheckoutSession() {
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ cartId, shippingAddress, redirectUrl }) =>
      createCheckoutSession({
        cartId,
        shippingAddress,
        redirectUrl,
        token,
      }),

    onSuccess: () => {
      toast.success('Redirecting to payment page...');
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, 'Could not start online payment.'));
    },
  });
}

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { loginUser } from '@/services/authService';
import { getErrorMessage } from '@/lib/getErrorMessage';

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success('Logged in successfully.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Login failed. Please try again.'));
    },
  });
}

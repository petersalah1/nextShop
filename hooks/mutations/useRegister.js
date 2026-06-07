import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { registerUser } from '@/services/authService';
import { getErrorMessage } from '@/lib/getErrorMessage';

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Account created successfully.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Registration failed. Please try again.'));
    },
  });
}

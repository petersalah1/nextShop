import { useQuery } from '@tanstack/react-query';
import { getLoggedUserCart } from '@/services/cartService';
import { useAuth } from '@/contexts/AuthContext';

export function useCartQuery() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['cart', token],
    queryFn: () => getLoggedUserCart(token),
    enabled: Boolean(token),
  });
}
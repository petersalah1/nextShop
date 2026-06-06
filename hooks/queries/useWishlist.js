import { useQuery } from '@tanstack/react-query';
import { getLoggedUserWishlist } from '@/services/wishlistService';
import { useAuth } from '@/contexts/AuthContext';

export function useWishlistQuery() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['wishlist', token],
    queryFn: () => getLoggedUserWishlist(token),
    enabled: Boolean(token),
  });
}
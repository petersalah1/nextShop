import { useQuery } from '@tanstack/react-query';
import { getProductDetails } from '@/services/productService';

export function useProductDetails(productId) {
  return useQuery({
    queryKey: ['productDetails', productId],
    queryFn: () => getProductDetails(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });
}
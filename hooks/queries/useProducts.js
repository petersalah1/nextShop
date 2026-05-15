import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/productService';


export function useProducts(params = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 5,
  });
}
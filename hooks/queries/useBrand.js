import { useQuery } from '@tanstack/react-query';
import { getBrandDetails } from '@/services/brandService';

export function useBrand(brandId) {
  return useQuery({
    queryKey: ['brand', brandId],
    queryFn: () => getBrandDetails(brandId),
    enabled: !!brandId,
    staleTime: 1000 * 60 * 60,
  });
}

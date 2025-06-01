import { useQuery } from '@tanstack/react-query';
import { PRODUCTS_KEY } from '@/lib/hooks/_cache-keys';
import products, { DBProduct } from '@/lib/services/products-service';

const useProducts = () =>
  useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: () =>
      products.getOdd<DBProduct>('/all').request.then(res => res.data.products),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

export { useProducts };

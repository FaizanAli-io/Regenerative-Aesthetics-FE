import { useQuery } from '@tanstack/react-query';
import { PRODUCTS_KEY } from '@/lib/hooks/_cache-keys';
import products, { Product } from '@/lib/services/products-service';

const useProducts = () =>
  useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: () => products.getAll<Product>().request.then(res => res.data),
  });

export { useProducts };

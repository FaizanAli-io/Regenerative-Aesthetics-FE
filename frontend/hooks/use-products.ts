import { useQuery } from '@tanstack/react-query';
import { PRODUCTS_KEY } from '@/cache-keys';
import products, { Product } from '@/services/products-service';

const useProducts = () =>
  useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: () => products.getAll<Product>().request.then(res => res.data),
  });

export { useProducts };

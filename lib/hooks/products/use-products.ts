import { useQuery } from '@tanstack/react-query';
import { PRODUCTS_KEY } from '@/lib/hooks/_cache-keys';
import products, { DBProduct } from '@/lib/services/products-service';

const useProducts = () =>
  useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: async () => {
      try {
        const response = await products.getOdd<DBProduct>('/all').request;
        return response.data?.products || [];
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
    initialData: [],
  });

export { useProducts };

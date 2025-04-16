import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import product, { Product } from '@/lib/services/products-service';
import { PRODUCTS_KEY } from '../_cache-keys';

interface Res extends Product {
  addedBy: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Req extends Omit<Product, 'id' | 'category' | 'price'> {
  categoryId: number;
  price: number;
}

const fn = async (data: Req): Promise<Res> => {
  const res = await product.create<Req, Res>(data);
  return res.data;
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Res, AxiosError, Req>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('adding product...');
      // Optimistic update logic can be implemented here if needed
    },

    onSuccess: data => {
      console.log('new product added.', data);
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
    },

    onSettled: () => {
      // / Also invalidate queries when the mutation is settled (either succeeded or failed)
      // queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import product, { Product } from '@/lib/services/products-service';
import { PRODUCTS_KEY } from '../_cache-keys';

interface Res extends Omit<Product, 'parentCategory' | 'children'> {
  addedBy: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

const fn = async (id: number): Promise<Res> => {
  const res = await product.delete(id);
  return res.data;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Res, AxiosError, number>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('deleting product...');
      // Optimistic update logic can be implemented here if needed
    },

    onSuccess: data => {
      console.log('product deleted.', data);
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
    },

    onSettled: () => {
      // Also invalidate queries when the mutation is settled (either succeeded or failed)
      // queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
    },
  });
};

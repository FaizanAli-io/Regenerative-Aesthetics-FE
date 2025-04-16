import order from '@/lib/services/orders-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CART_KEY } from '../_cache-keys';

const fn = async (id: number): Promise<unknown> => {
  const res = await order.delete(id, '/cart/remove');
  return res.data;
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, number>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('deleting cart item...');
      // Optimistic update logic can be implemented here if needed
    },

    onSuccess: data => {
      console.log('deleted cart item.', data);
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
    },

    onSettled: () => {
      // Also invalidate queries when the mutation is settled (either succeeded or failed)
    },
  });
};

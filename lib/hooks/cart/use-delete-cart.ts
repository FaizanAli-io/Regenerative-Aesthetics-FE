import order from '@/lib/services/orders-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CART_KEY } from '../_cache-keys';
import { CartRes } from './use-cart';
import { produce } from 'immer';

const fn = async (id: number): Promise<unknown> => {
  const res = await order.delete(id, '/cart/remove');
  return res.data;
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError,
    number,
    { cartItems: CartRes | null }
  >({
    mutationFn: fn,

    onMutate: async id => {
      queryClient.cancelQueries({ queryKey: CART_KEY });
      const prevCartItems = queryClient.getQueryData<CartRes>(CART_KEY);

      queryClient.setQueryData<CartRes>(CART_KEY, old => {
        return produce(old, draft => {
          if (!draft) return draft;

          draft.products = draft.products.filter(p => p.product.id !== id);

          return draft;
        });
      });

      return { cartItems: prevCartItems || null };
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
      if (context?.cartItems)
        queryClient.setQueryData<CartRes>(CART_KEY, context.cartItems);
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });
};

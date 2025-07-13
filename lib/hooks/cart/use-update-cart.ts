import { produce } from 'immer';
import cart from '@/lib/services/cart-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CART_KEY } from '../_cache-keys';
import { CartRes } from './use-cart';

interface Req {
  productId: number;
  quantity: number;
}

const fn = async (data: Req): Promise<CartRes> => {
  const res = await cart.patch<Req, CartRes>(data, '/quantity');
  return res.data;
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CartRes,
    AxiosError,
    Req,
    { previousCart: CartRes | null }
  >({
    mutationFn: fn,
    onMutate: async newItem => {
      await queryClient.cancelQueries({ queryKey: CART_KEY });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<CartRes>(CART_KEY);

      if (!previousCart) return { previousCart: null };

      // Optimistically update the cache

      queryClient.setQueryData<CartRes>(CART_KEY, old => {
        if (!old) return old;

        const updatedCart = produce(old, draft => {
          draft.products.forEach(product => {
            if (product.product.id === newItem.productId)
              product.product_quantity = newItem.quantity;
          });

          // Recalculate total amount
          draft.totalAmount = draft.products.reduce(
            (sum, p) => sum + p.product_quantity * +p.product_unit_price,
            0
          );
        });

        return updatedCart;
      });

      return { previousCart };
    },
    onError: (error, _, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData<CartRes>(CART_KEY, context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
};

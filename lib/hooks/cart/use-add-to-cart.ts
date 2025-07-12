import cart, { CartAddReq } from '@/lib/services/cart-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Product } from '@/lib/services/products-service';
import { CART_KEY } from '../_cache-keys';

interface Res {
  id: number;
  orderAt: string;
  status: string;
  shippedAt: string | null;
  deliveredAt: string | null;
  totalPrice: number;
  products: Product[];
}

const fn = async (data: CartAddReq): Promise<Res> => {
  const res = await cart.create<CartAddReq, Res>(data);
  return res.data;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<Res, AxiosError, CartAddReq>({
    mutationFn: fn,

    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
    },
  });
};

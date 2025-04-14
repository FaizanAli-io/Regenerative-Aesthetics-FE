import cart, { CartAddReq } from '@/lib/services/cart-service';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Product } from '@/lib/services/products-service';

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
  return useMutation<Res, AxiosError, CartAddReq>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('adding cart item started');
      // Optimistic update logic
      // await queryClient.cancelQueries(['wishlist']);
      // const previousWishlist = queryClient.getQueryData<Res[]>(['wishlist']);
      // queryClient.setQueryData<Res[]>(['wishlist'], old => [
      //   ...(old || []),
      //   {
      //     id: Date.now(),
      //     createdAt: new Date().toISOString(),
      //     user: { id: newItem.userId },
      //     product: { id: newItem.productId },
      //   },
      // ]);
      // return { previousWishlist };
    },

    onSuccess: data => {
      console.log('added to the cart.', data);
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
      //   if (context?.previousWishlist) {
      //     queryClient.setQueryData(['wishlist'], context.previousWishlist);
      //   }
    },

    onSettled: () => {
      // queryClient.invalidateQueries(['wishlist']);
    },
  });
};

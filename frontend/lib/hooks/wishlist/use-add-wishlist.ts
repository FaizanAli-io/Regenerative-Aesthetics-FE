import wishlist, { WishlistItemRequest } from '@/lib/services/wishlist-service';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface Res {
  id: number;
  createdAt: string;
  user: {
    id: number;
  };
  product: {
    id: number;
  };
}

const fn = async (data: WishlistItemRequest): Promise<Res> => {
  const res = await wishlist.create<WishlistItemRequest, Res>(data, '/add');
  return res.data;
};

export const useAddWishlist = () => {
  return useMutation<Res, AxiosError, WishlistItemRequest>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('adding started');
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
      console.log('added to wishlist', data);
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

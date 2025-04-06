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

    onMutate: () => {
      console.log('adding started');
      // Optionally, you can show a spinner or disable the button here
    },

    onSuccess: data => {
      console.log('added to wishlist', data);
    },

    onError: error => {
      console.error(error.message, error);
    },
  });
};

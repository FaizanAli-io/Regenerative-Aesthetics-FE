import wishlist, {
  WishlistItem,
  WishlistItemRequest,
  WishlistResponse,
  WLProduct,
} from '@/lib/services/wishlist-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PRODUCTS_KEY, WISH_LIST_KEY } from '../_cache-keys';
import { Product } from '@/lib/services/products-service';

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
  const queryClient = useQueryClient();
  return useMutation<
    Res,
    AxiosError,
    WishlistItemRequest,
    { previousWishlist: WishlistResponse; tempId?: number }
  >({
    mutationFn: fn,

    onMutate: async newItem => {
      queryClient.cancelQueries({ queryKey: WISH_LIST_KEY });

      const previousWishlist =
        queryClient.getQueryData<WishlistResponse>(WISH_LIST_KEY);

      if (!previousWishlist) return undefined;

      const products = queryClient.getQueryData<Product[]>(PRODUCTS_KEY);
      if (!products) return { previousWishlist };

      const tempProduct = products.find(item => item.id === newItem.productId);

      if (!tempProduct) {
        console.warn(`Product with ID ${newItem.productId} not found in cache`);
        return { previousWishlist };
      }
      const product: WLProduct = {
        ...tempProduct,
        createdAt: new Date().toISOString(),
        updatedAt: tempProduct.updatedAt || new Date().toISOString(),
      };

      const tempId = Date.now(); // Store temp ID for later reference

      const wishlistItem: WishlistItem = {
        id: tempId,
        createdAt: new Date().toISOString(),
        product,
      };

      queryClient.setQueryData<WishlistResponse>(WISH_LIST_KEY, old => {
        if (old) {
          return {
            ...old,
            totalItems: old.totalItems + 1,
            wishlistItems: [...old.wishlistItems, wishlistItem],
          };
        }
        return old;
      });

      return { previousWishlist, tempId };
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<WishlistResponse>(WISH_LIST_KEY, old => {
        if (old && context?.tempId) {
          return {
            ...old,
            wishlistItems: old.wishlistItems.map(item =>
              item.id === context.tempId
                ? { ...item, id: data.id, createdAt: data.createdAt }
                : item
            ),
          };
        }
        return old;
      });
    },
    onError: (error, newItem, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(WISH_LIST_KEY, context.previousWishlist);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WISH_LIST_KEY });
    },
  });
};

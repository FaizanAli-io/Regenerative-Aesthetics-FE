import wishlist, {
  WishlistItem,
  WishlistItemRequest,
  WishlistResponse,
  WLProduct,
} from '@/lib/services/wishlist-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { WISH_LIST_KEY } from '../_cache-keys';
import { toast } from 'sonner';

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    AxiosError,
    number,
    { previousWishlist: WishlistResponse }
  >({
    mutationFn: (productId: number) => wishlist.delete(productId, '/remove'),

    onMutate: async (productId: number) => {
      queryClient.cancelQueries({ queryKey: WISH_LIST_KEY });

      // Snapshot the previous value
      const previousWishlist =
        queryClient.getQueryData<WishlistResponse>(WISH_LIST_KEY);

      if (!previousWishlist) return undefined;

      // Optimistically remove the item from the wishlist
      queryClient.setQueryData<WishlistResponse>(WISH_LIST_KEY, old => {
        if (old) {
          const filteredItems = old.wishlistItems.filter(
            item => item.product.id !== productId
          );
          return {
            ...old,
            totalItems: Math.max(0, old.totalItems - 1),
            wishlistItems: filteredItems,
          };
        }
        return old;
      });

      // Return a context object with the snapshotted value      return { previousWishlist };
    },

    onSuccess: () => {
      toast.success('Removed from wishlist!');
    },

    onError: (error, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousWishlist) {
        queryClient.setQueryData(WISH_LIST_KEY, context.previousWishlist);
      }
      toast.error('Failed to remove from wishlist. Please try again.');
    },

    onSettled: () => {
      // Always refetch after error or success to ensure data consistency
      queryClient.invalidateQueries({ queryKey: WISH_LIST_KEY });
    },
  });
};

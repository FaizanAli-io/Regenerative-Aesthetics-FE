import { useQuery } from '@tanstack/react-query';
import { WISH_LIST_KEY } from '@/lib/hooks/_cache-keys';
import { WishlistResponse } from '../../services/wishlist-service';
import wishlist from '@/lib/services/wishlist-service';

const useWishlist = () =>
  useQuery({
    queryKey: WISH_LIST_KEY,
    queryFn: () =>
      wishlist.getOdd<WishlistResponse>('/').request.then(res => res.data),
  });

export { useWishlist };

import { useQuery } from '@tanstack/react-query';
import { WishlistResponse } from '../../services/wishlist-service';
import wishlist from '@/lib/services/wishlist-service';
import { WISH_LIST_ALL_KEY } from '../_cache-keys';

const useWishlistAll = () =>
  useQuery({
    queryKey: WISH_LIST_ALL_KEY,
    queryFn: () =>
      wishlist
        .getOdd<WishlistResponse>('/all?limit=1000')
        .request.then(res => res.data),
  });

export { useWishlistAll };

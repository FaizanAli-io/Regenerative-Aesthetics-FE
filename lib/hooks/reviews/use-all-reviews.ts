import review, { Review } from '@/lib/services/review-service';
import { useQuery } from '@tanstack/react-query';
import { REVIEWS_ALL_KEY } from '../_cache-keys';

const useAllReviews = () =>
  useQuery({
    queryKey: REVIEWS_ALL_KEY,
    queryFn: async () => {
      try {
        const response = await review.getAll<Review>().request;
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

export { useAllReviews };

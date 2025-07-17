import review, { Review } from '@/lib/services/review-service';
import { useQuery } from '@tanstack/react-query';
import { REVIEWS_KEY } from '../_cache-keys';

const useReviews = () =>
  useQuery({
    queryKey: REVIEWS_KEY,
    queryFn: async () => {
      try {
        const response = await review.getOdd<Omit<Review, 'user'>[]>('')
          .request;
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

export { useReviews };

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { REVIEWS_KEY } from '../_cache-keys';
import review, { Review, ReviewReq } from '@/lib/services/review-service';
import { toast } from 'sonner';

const fn = async (data: ReviewReq): Promise<Review> => {
  const res = await review.create<ReviewReq, Review>(data);
  return res.data;
};

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation<Review, AxiosError, ReviewReq>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('Review Added!');
      // Optimistic update logic can be implemented here if needed
    },

    onSuccess: data => {
      toast.success('Review Added!');
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
      toast.error("Review couldn't be added. Something went wrong!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_KEY });
    },
  });
};

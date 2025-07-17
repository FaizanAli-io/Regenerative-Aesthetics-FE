import { Review } from '@/lib/services/review-service';
import { StarIcon } from 'lucide-react';
import React from 'react';

interface Props {
  review: Omit<Review, 'user'>;
}

const ReviewHistoryItem = ({ review }: Props) => {
  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-lg text-primary-darker font-semibold'>
            {review.product.title}
          </h2>
          <p className='text-primary-darker'>#{review.product.id}</p>
        </div>
        <div className='flex'>
          {new Array(review.ratings).fill(null).map((_, i) => (
            <StarIcon key={i} fill='gold' strokeWidth={1} />
          ))}
        </div>
      </div>
      <p className='mt-2 text-black/60'>{review.comment}</p>
    </div>
  );
};

export default ReviewHistoryItem;

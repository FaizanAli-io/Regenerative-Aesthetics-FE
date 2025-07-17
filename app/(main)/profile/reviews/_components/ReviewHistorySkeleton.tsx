import React from 'react';
import ReviewHistoryItemSkeleton from './ReviewHistoryItemSkeleton';

const ReviewHistorySkeleton = () => {
  return (
    <div className='space-y-5 border-1 border-gray-200 rounded-md divide-y-1 divide-gray-200'>
      {new Array(5).fill(null).map((_, i) => (
        <div key={i} className='p-5'>
          <ReviewHistoryItemSkeleton />
        </div>
      ))}
    </div>
  );
};

export default ReviewHistorySkeleton;

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ReviewHistoryItemSkeleton = () => {
  return (
    <div>
      <div className='flex justify-between mb-5'>
        <div>
          <Skeleton className='w-100 h-8 mb-2' />
          <Skeleton className='w-50 h-5' />
        </div>
        <Skeleton className='w-50 h-8' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='w-full h-5' />
        <Skeleton className='w-[80%] h-5' />
        <Skeleton className='w-90 h-5' />
        <Skeleton className='w-[90%] h-5' />
      </div>
    </div>
  );
};

export default ReviewHistoryItemSkeleton;

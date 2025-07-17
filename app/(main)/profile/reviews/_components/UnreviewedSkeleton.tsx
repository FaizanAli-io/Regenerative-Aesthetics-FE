import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const UnreviewedSkeleton = () => {
  const Item = () => (
    <div className='flex justify-between items-center p-4'>
      <Skeleton className='w-2/5 h-8' />
      <Skeleton className='w-1/5 h-8' />
    </div>
  );

  return (
    <>
      {new Array(5).fill(null).map((_, i) => (
        <Item key={i} />
      ))}
    </>
  );
};

export default UnreviewedSkeleton;

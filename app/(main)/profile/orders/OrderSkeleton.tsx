import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const OrderSkeleton = () => {
  const skeletons = new Array(4)
    .fill(null)
    .map((_, i) => (
      <Skeleton key={i} className='h-[150px] w-full rounded-tr-3xl mb-5' />
    ));

  return <div>{skeletons}</div>;
};

export default OrderSkeleton;

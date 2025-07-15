import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SubnavSkeleton = () => {
  return (
    <div className='bg-dark '>
      <ul className='list-none flex justify-center py-3 divide-x divide-body'>
        {new Array(12).fill(null).map((_, index) => (
          <li key={index}>
            <Skeleton className='w-20 h-5 mx-2' />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubnavSkeleton;

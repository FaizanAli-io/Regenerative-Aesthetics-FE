import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Props {
  theme?: 'light' | 'dark' | 'primary';
  className?: string;
}

const ProductCardSkeleton = ({ theme = 'light', className }: Props) => {
  return (
    <Card
      className={cn(
        {
          'bg-primary': theme === 'primary',
          'bg-dark': theme === 'dark',
          'bg-[#f6f6f6] border-0': theme === 'light',
        },
        'px-4 py-4',
        className
      )}
    >
      <CardContent className='px-2 flex flex-col items-center h-full space-y-4'>
        {/* Heart icon skeleton */}
        <div className='flex justify-end w-full'>
          <Skeleton className='h-6 w-6 rounded-full' />
        </div>

        {/* Product image skeleton */}
        <Skeleton className='w-full h-48 rounded-lg' />

        {/* Product title skeleton */}
        <div className='w-full text-center space-y-2'>
          <Skeleton className='h-4 w-3/4 mx-auto' />
          <Skeleton className='h-4 w-1/2 mx-auto' />
        </div>

        {/* Price skeleton */}
        <Skeleton className='h-6 w-20 mx-auto' />

        {/* Button skeleton */}
        <Skeleton className='h-10 w-full rounded-md' />
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;

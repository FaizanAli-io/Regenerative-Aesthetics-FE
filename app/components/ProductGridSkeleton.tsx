import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import ProductCardSkeleton from '@/app/components/ProductCardSkeleton';

interface Props {
  itemCount?: number;
  theme?: 'light' | 'dark' | 'primary';
}

const ProductGridSkeleton = ({ itemCount = 12, theme = 'light' }: Props) => {
  return (
    <div className='space-y-10'>
      {/* Header section skeleton */}
      <div className='flex justify-between w-full items-end'>
        <div className='flex items-center space-x-2'>
          <Label className='text-body text-lg'>Selected Products:</Label>
          <Skeleton className='h-6 w-16' />
        </div>

        {/* Sort dropdown skeleton */}
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Product grid skeleton */}
      <div className='grid grid-cols-4 gap-5'>
        {Array.from({ length: itemCount }).map((_, index) => (
          <ProductCardSkeleton key={index} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default ProductGridSkeleton;

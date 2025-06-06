import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Props {
  variant?: 'vertical' | 'horizontal';
  className?: string;
}

const BlogCardSkeleton = ({ variant = 'horizontal', className }: Props) => {
  return (
    <article
      className={cn(
        {
          'grid grid-cols-2 gap-5': variant === 'horizontal',
          'space-y-5': variant === 'vertical',
        },
        className
      )}
    >
      {/* Blog Image Skeleton */}
      <Skeleton className='w-full h-64 rounded-lg' />

      {/* Blog Content Skeleton */}
      <div className='flex flex-col space-y-3'>
        {/* Title Skeleton */}
        <div className='space-y-2 my-2'>
          <Skeleton className='h-8 w-3/4' />
          <Skeleton className='h-8 w-1/2' />
        </div>

        {/* Content Skeleton */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
        </div>

        {/* Button Skeleton */}
        <div className='pt-2'>
          <Skeleton className='h-12 w-32 rounded-full' />
        </div>
      </div>
    </article>
  );
};

export default BlogCardSkeleton;

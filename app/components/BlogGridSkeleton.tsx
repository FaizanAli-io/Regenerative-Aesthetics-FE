import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import BlogCardSkeleton from './BlogCardSkeleton';

interface Props {
  itemCount?: number;
  variant?: 'vertical' | 'horizontal';
  showHeader?: boolean;
}

const BlogGridSkeleton = ({
  itemCount = 3,
  variant = 'horizontal',
  showHeader = true,
}: Props) => {
  return (
    <div className='space-y-12'>
      {/* Header Section Skeleton */}
      {showHeader && (
        <div className='text-center space-y-4'>
          <Skeleton className='h-16 w-80 mx-auto' />
          <div className='space-y-2 max-w-2xl mx-auto'>
            <Skeleton className='h-6 w-full' />
            <Skeleton className='h-6 w-3/4 mx-auto' />
          </div>
        </div>
      )}

      {/* Blogs Grid Skeleton */}
      <div className='grid gap-12'>
        {Array.from({ length: itemCount }).map((_, index) => (
          <BlogCardSkeleton key={index} variant={variant} />
        ))}
      </div>
    </div>
  );
};

export default BlogGridSkeleton;

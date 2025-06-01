import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  remarks: string;
  value: number;
  reviewsCount: number;
}

const ReviewBar = ({
  remarks,
  value,
  reviewsCount,
  className,
  ...props
}: Props) => {
  return (
    <div className={cn('w-full grid grid-cols-5', className)} {...props}>
      <p className='col-start-1 col-end-2 text-primary-darker font-medium text-2xl'>
        {remarks}
      </p>
      <div className='col-start-2 col-end-6'>
        <Progress
          value={value}
          className='w-full bg-gray-200 dark:bg-gray-800 [&>div]:bg-[#ffb547]'
        />
      </div>
      <p className='text-body font-medium text-xl col-start-6 col-end-7 px-5'>
        {reviewsCount}
      </p>
    </div>
  );
};

export default ReviewBar;

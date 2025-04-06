import { cn } from '@/lib/utils';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  text1: string;
  text2: string;
  icon: React.ReactNode;
}

const ProductExtras = ({ text1, text2, icon, className, ...props }: Props) => {
  return (
    <div className={cn('flex space-x-4 items-center', className)} {...props}>
      <div className='bg-subtle-gray text-body p-4 rounded-md'>{icon}</div>

      <div className='flex flex-col'>
        <p className='text-lg text-black/60 font-semibold'>{text1}</p>
        <p className='text-lg font-medium'>{text2}</p>
      </div>
    </div>
  );
};

export default ProductExtras;

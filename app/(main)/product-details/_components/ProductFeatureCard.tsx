import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

interface ProductFeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  textNeutral?: string;
  text?: string;
}

const ProductFeatureCard = ({
  text,
  textNeutral,
  className,
  children,
  ...props
}: ProductFeatureCardProps) => {
  return (
    <div
      className={cn('px-2 py-4 bg-subtle-gray rounded-lg w-full', className)}
      {...props}
    >
      {text && (
        <p className='text-center text-lg font-medium text-primary-darker'>
          {textNeutral && (
            <span className='text-body block'>{textNeutral}</span>
          )}
          {text}
        </p>
      )}
      {children}
    </div>
  );
};

export default ProductFeatureCard;

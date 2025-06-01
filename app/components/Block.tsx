import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

const Block = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('px-20', className)} {...props}>
      {children}
    </div>
  );
};

export default Block;

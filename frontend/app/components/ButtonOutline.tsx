import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

const ButtonOutline = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      variant='outline'
      className={cn(
        'text-lg px-15 py-8 border-primary-darker bg-white/30 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonOutline;

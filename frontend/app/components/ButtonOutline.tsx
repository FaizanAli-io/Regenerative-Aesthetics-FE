import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

const ButtonOutline = ({
  children,
  className,
  disabled = false,
  ...props
}: Props) => {
  return (
    <Button
      disabled={disabled}
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

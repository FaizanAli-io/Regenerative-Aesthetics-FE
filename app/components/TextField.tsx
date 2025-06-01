import React from 'react';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';

const TextField = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Input
      className={clsx(
        'rounded-sm  border-1 border-body placeholder:text-lg md:text-lg md:px-4 py-7',
        className
      )}
      {...props}
    />
  );
};

export default TextField;

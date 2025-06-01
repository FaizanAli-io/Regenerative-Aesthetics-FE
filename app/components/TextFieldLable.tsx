import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

const TextFieldLablel = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLLabelElement>) => {
  return (
    <Label
      className={clsx('text-md font-[400] text-gray-900', className)}
      {...props}
    >
      {children}
    </Label>
  );
};

export default TextFieldLablel;

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  charges: string;
  text: string;
  date: string;
}

const ShippingMethodItem = ({
  charges,
  text,
  date,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        'border-1 border-gray-400 flex items-center justify-between space-x-5 p-5 text-2xl text-primary-darker rounded-md',
        className
      )}
      {...props}
    >
      <div className='flex items-center space-x-5 text-xl'>
        <div className='flex items-center space-x-2'>
          <Checkbox
            className=' data-[state=checked]:bg-primary-variant2'
            id='billing-address'
            checked
          />
          <label
            htmlFor={text}
            className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {/* {charges} */}
          </label>
        </div>
        <p>{text}</p>
      </div>
      {/* <p className='font-semibold text-lg'>{date}</p> */}
      {/* <p className='font-semibold text-lg'></p> */}
    </div>
  );
};

export default ShippingMethodItem;

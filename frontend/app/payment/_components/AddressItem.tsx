import React from 'react';
import { cn } from '@/lib/utils';
import { Edit3, X } from 'lucide-react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  label: string;
  address: string;
  phone: string;
}

const AddressItem = ({
  title,
  label,
  address,
  phone,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        'bg-primary-variant2/5 flex items-center justify-between space-x-5 p-5 text-2xl text-primary-darker rounded-md',
        className
      )}
      {...props}
    >
      <div className='text-xl space-y-2'>
        <div className='flex items-center space-x-5'>
          {/* <Checkbox
            className=' data-[state=checked]:bg-primary-variant2'
            id='billing-address'
            checked
          /> */}
          <label
            htmlFor={label}
            className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {title}
          </label>

          <label
            className='bg-primary-variant2 p-2 uppercase rounded-md text-white text-sm'
            htmlFor={label}
          >
            {label}
          </label>
        </div>

        <p>{address}</p>
        <p>{phone}</p>
      </div>
      <div className='flex space-x-2'>
        <Edit3 />
        <X />
      </div>
    </div>
  );
};

export default AddressItem;

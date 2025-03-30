import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  code: string;
  price: string;
  qty: number;
}

const CartItem = ({
  image,
  title,
  code,
  price,
  qty,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-5 items-center space-x-5 py-10',
        className
      )}
      {...props}
    >
      <div className='flex space-x-2 items-center col-span-3'>
        <Image
          src={image}
          alt={title}
          className='max-w-20 h-auto object-contain'
          width={150}
          height={150}
          objectFit='contain'
        />
        <div>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <p className='text-gray-600'>{code}</p>
        </div>
      </div>
      <div className='flex'>
        <Button className='bg-white text-primary-darker text-2xl pt-1 cursor-pointer hover:bg-white'>
          -
        </Button>
        <Input
          className='border-1 w-10 px-3 py-1 rounded-sm border-gray-300 font-semibold text-center text-primary-darker'
          value={qty}
        />
        <Button className='bg-white text-primary-darker text-2xl pt-1 cursor-pointer hover:bg-white'>
          +
        </Button>
      </div>
      <div className='flex space-x-5 items-center'>
        <p className='text-2xl text-primary-darker'>{price}</p>
        <XIcon
          size={25}
          className='cursor-pointer text-gray-500'
          strokeWidth={1}
        />
      </div>
    </div>
  );
};

export default CartItem;

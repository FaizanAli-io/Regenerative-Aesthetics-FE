import { CartItem as ICartItem } from '@/lib/stores/cart';
import clsx from 'clsx';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  unitPrice: number;
  quantity: number;
}

const CartItem = ({
  title,
  unitPrice,
  quantity,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-5 items-center space-x-5 py-2',
        className
      )}
      {...props}
    >
      <div className='flex space-x-2 items-center col-span-3'>
        <Image
          src='/images/home/shampoo.png'
          alt={title}
          className='max-w-20 h-auto object-contain'
          width={150}
          height={150}
          objectFit='contain'
        />
        <div>
          <h2 className='text-lg font-semibold'>{title}</h2>
          {/* <p className='text-gray-600'>{code}</p> */}
        </div>
      </div>
      <div className='flex space-x-5 items-center'>
        <p className='text-2xl text-primary-darker'>
          {/* make sure that the precision is no more than 2 */}
          {unitPrice * quantity}
        </p>
      </div>
    </div>
  );
};

export default CartItem;

import React, { HTMLAttributes } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/services/products-service';

interface Props extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const SummaryItem = ({ product: { price, title } }: Props) => {
  return (
    <div className='bg-primary-variant2/5 flex items-center justify-between space-x-5 p-5 text-2xl text-primary-darker rounded-md'>
      <Image
        // !TODO: Remove this hardcoded image and use the product image from the API
        src='/images/home/shampoo.png'
        alt={title}
        className='max-w-15 h-auto object-contain'
        width={50}
        height={50}
        objectFit='contain'
      />
      <p className='text-lg'>{title}</p>
      <p className='font-semibold text-2xl'>{price}</p>
    </div>
  );
};

export default SummaryItem;

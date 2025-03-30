import React, { HTMLAttributes } from 'react';
import Image from 'next/image';

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string;
  text: string;
  price: string;
}

const SummaryItem = ({ image, text, price }: Props) => {
  return (
    <div className='bg-primary-variant2/5 flex items-center justify-between space-x-5 p-5 text-2xl text-primary-darker rounded-md'>
      <Image
        src={image}
        alt={text}
        className='max-w-15 h-auto object-contain'
        width={50}
        height={50}
        objectFit='contain'
      />
      <p className='text-lg'>{text}</p>
      <p className='font-semibold text-2xl'>{price}</p>
    </div>
  );
};

export default SummaryItem;

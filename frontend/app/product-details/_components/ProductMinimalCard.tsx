import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string;
  price: string;
  text: string;
}

const ProductMinimalCard = ({ image, price, text }: Props) => {
  return (
    <article className='space-y-1 flex flex-col justify-center items-center'>
      <Image
        src={image}
        width={500}
        height={500}
        alt='product sample image'
        className='object-contain w-96 h-96'
      />
      <div>
        <p className='text-center text-body text-lg'>
          {text}
          <span className='block'>${price}</span>
        </p>
      </div>
    </article>
  );
};

export default ProductMinimalCard;

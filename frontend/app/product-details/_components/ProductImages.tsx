import Image from 'next/image';
import React from 'react';

const ProductImages = () => {
  return (
    <div className='grid grid-cols-3 gap-x-10 '>
      <div className='flex flex-col space-y-5'>
        <Image
          src='/images/product/2.png'
          width={500}
          height={500}
          alt='product sample image'
          className='object-contain w-full h-full'
        />
        <Image
          src='/images/product/2.png'
          width={1000}
          height={500}
          alt='product sample image'
          className='object-contain w-full h-full'
        />
        <Image
          src='/images/product/3.png'
          width={500}
          height={500}
          alt='product sample image'
          className='object-contain w-full h-full'
        />
      </div>
      <Image
        src='/images/product/1.png'
        width={500}
        height={500}
        alt='product sample image'
        className='object-contain w-full h-full col-span-2'
      />
    </div>
  );
};

export default ProductImages;

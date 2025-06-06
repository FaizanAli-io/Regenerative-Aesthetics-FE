import ButtonOutline from '@/app/components/ButtonOutline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OurProducts = () => {
  return (
    <div className='h-fit'>
      <h2 className='bg-primary-darker uppercase text-7xl font-bold text-center py-2 text-white'>
        Our Products
      </h2>
      <div className='grid grid-cols-2  max-h-max'>
        <div className='flex flex-col'>
          <Image
            src='/images/home/skin-model.png'
            alt='serum'
            width={500}
            height={500}
            className='object-cover w-full h-full translate-y-2'
          />
          <div className='px-10 py-20 space-y-2 h-fit '>
            <h3 className='text-4xl'>Skin Care Products</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Augue in ornare accumsan
              ultricies enim lacus nunc vestibulum. Gravida vitae sed porttitor
              condimentum. Ullamcorper auctor tincidunt amet aliquam tellus. Mi
              odio ullamcorper egestas facilisi in pellentesque pellentesque
              lacus lectus.
            </p>
            <ButtonOutline className=' text-md py-6 font-semibold mt-5'>
              <Link href='/products'>Shop Now</Link>
            </ButtonOutline>
          </div>
        </div>

        <div className='flex flex-col'>
          <Image
            src='/images/home/hair-model.png'
            alt='serum'
            width={500}
            height={500}
            className='object-cover w-full h-full'
          />
          <div className='bg-primary-variant text-white px-10 py-20 space-y-2 h-fit'>
            <h3 className='text-4xl'>Hair Care & Treatments</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Augue in ornare accumsan
              ultricies enim lacus nunc vestibulum. Gravida vitae sed porttitor
              condimentum. Ullamcorper auctor tincidunt amet aliquam tellus. Mi
              odio ullamcorper egestas facilisi in pellentesque pellentesque
              lacus lectus.
            </p>
            <ButtonOutline className='border-white bg-transparent text-md py-6 font-semibold mt-5'>
              <Link href='/products'>Shop Now</Link>
            </ButtonOutline>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProducts;

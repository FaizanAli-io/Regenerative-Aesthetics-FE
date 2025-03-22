import Image from 'next/image';
import React from 'react';
import ContactForm from './ContactForm';

const GetInTouch = () => {
  return (
    <section className='bg-gradient-to-r from-[#161616] via-[#282828] to-[#3c3c3c] text-white'>
      <div className='grid grid-cols-2 mx-20 '>
        <div className='flex  items-center '>
          <ContactForm />
        </div>
        <Image
          src='/images/home/hands.png'
          alt='Get in Touch'
          width={500}
          height={500}
          className='w-full h-full object-cover'
        />
      </div>
    </section>
  );
};

export default GetInTouch;

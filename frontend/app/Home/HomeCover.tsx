import React from 'react';
import Block from '../components/Block';
import ButtonOutline from '../components/ButtonOutline';

const HomeCover = () => {
  return (
    <section className='bg-[url(/images/home/cover.png)] bg-cover bg-center h-[calc(100vh-4rem)]'>
      <Block className='h-full flex flex-col justify-center items-end space-y-5'>
        <div className='flex items-center justify-end'>
          <h1 className='text-primary-darker text-8xl font-semibold text-right leading-28 tracking-[1.5]'>
            <span className='text-3xl uppercase font-semibold block '>
              one stop solution at
            </span>
            Regenerative <br />
            Aesthetics
            <br />
          </h1>
        </div>
        <ButtonOutline>Discover Our Products</ButtonOutline>
      </Block>
    </section>
  );
};

export default HomeCover;

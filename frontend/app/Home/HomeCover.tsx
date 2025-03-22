import React from 'react';
import Block from '../components/Block';

const HomeCover = () => {
  return (
    <section className='bg-[url(/images/home/cover.png)] bg-cover bg-center h-[calc(100vh-4rem)]'>
      <Block className='flex items-center justify-end h-full'>
        <h1 className='text-primary-darker text-8xl font-semibold text-right leading-28 tracking-[1.5]'>
          <span className='text-3xl uppercase font-semibold block '>
            one stop solution at
          </span>
          Regenerative <br />
          Aesthetics
        </h1>
      </Block>
    </section>
  );
};

export default HomeCover;

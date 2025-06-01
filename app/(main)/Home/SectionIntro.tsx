import ButtonOutline from '@/app/components/ButtonOutline';
import React from 'react';

const SectionIntro = () => {
  return (
    <div className='grid grid-cols-2 place-content-center'>
      <div className='px-32 py-44 bg-[url(/images/home/serum.png)] bg-contain bg-no-repeat bg-left'>
        <div className='pl-30 space-y-5'>
          <h2 className='text-7xl text-primary-dark font-bold'>
            Regen <br /> Aesthetics
          </h2>
          <p className='text-lg text-body'>
            We are dedicated to revolutionizing hair and skincare through
            cutting-edge biologic solutions. With a focus on regenerative
            science, we harness the power of advanced biotechnology to deliver
            innovative, non-invasive treatments that enhance natural beauty and
            promote long-term wellness.
          </p>
        </div>
      </div>
      <div className='bg-primary text-white px-32 py-44 space-y-5 bg-[url(/images/home/hair-spray.png)] bg-contain bg-no-repeat bg-right flex flex-col justify-center items-start'>
        <h2 className='text-6xl uppercase '>About us!</h2>
        <p className='max-w-1/2'>
          Lorem ipsum dolor sit amet consectetur. Accumsan lobortis eu non nec
          eu volutpat elementum quam cursus.
        </p>
        <ButtonOutline className='border-white bg-transparent'>
          More
        </ButtonOutline>
      </div>
    </div>
  );
};

export default SectionIntro;

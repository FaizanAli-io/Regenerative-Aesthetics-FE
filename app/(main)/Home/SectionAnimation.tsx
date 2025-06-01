'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SectionAnimation = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.from('.blob', {
        y: '-100%',
        duration: 1.5,
      }).from(
        '.product',
        {
          y: '100%',
        },
        '-=1'
      );

      tl.to('.blob', {
        y: '100%',
        duration: 1.5,
      }).to(
        '.product',
        {
          y: '-100%',
          duration: 1.5,
        },
        '<'
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className='relative w-full overflow-hidden'>
      <img
        src='/blob.png'
        className='w-full h-auto absolute top-1/2 left-1/2 -translate-1/2 blob'
      />
      <img src='/product.png' className='w-[1000px] h-auto ml-auto product' />
    </div>
  );
};

export default SectionAnimation;

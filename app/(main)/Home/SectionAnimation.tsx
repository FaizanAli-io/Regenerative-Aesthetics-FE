'use client';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SectionAnimation = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useGSAP(
    () => {
      if (!isClient) return;

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
    { scope: container, dependencies: [isClient] }
  );

  return (
    <div ref={container} className='relative w-full overflow-hidden h-screen'>
      <img
        src='/blob.png'
        className='w-full h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blob'
        alt='Background blob'
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <img
        src='/product.png'
        className='w-[1000px] h-auto ml-auto product'
        alt='Product showcase'
      />
    </div>
  );
};

export default SectionAnimation;

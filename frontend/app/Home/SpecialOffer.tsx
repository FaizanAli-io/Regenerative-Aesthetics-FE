import Image from 'next/image';
import React from 'react';
import ProductCard from '../components/ProductCard';
import ButtonOutline from '../components/ButtonOutline';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface CardData {
  image: string;
  price: string;
  theme?: 'light' | 'dark' | 'primary';
  children: React.ReactNode;
}

const data: CardData[] = [
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Living Proof <br />
        Frizz Free Shampoo
      </p>
    ),
    price: '$900',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        GOPURE
        <br />
        Eye Cream
      </p>
    ),
    price: '$2535',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Living Proof <br />
        Frizz Free Shampoo
      </p>
    ),
    price: '$900',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        GOPURE
        <br />
        Eye Cream
      </p>
    ),
    price: '$2535',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
];

const SpecialOffer = () => {
  return (
    <section>
      <Image
        src='/images/home/discount-banner.png'
        alt='Special Offer'
        width={1920}
        height={1080}
        className='object-cover w-full h-full shadow-lg shadow-gray-500'
      />
      <div className='flex space-x-10 py-32'>
        <div className='flex flex-col space-y-5 justify-center items-start pl-20'>
          <h2 className=' uppercase text-8xl font-semibold  py-2 text-primary-darker'>
            Special <br /> Offer
          </h2>
          <ButtonOutline className='text-sm py-6 px-10 border-primary-darker text-dark'>
            GRAB NOW!!!
          </ButtonOutline>
        </div>
        {/* <div className='flex space-x-5 overflow-auto'> */}
        <div className='overflow-hidden'>
          <Carousel>
            <CarouselContent>
              {data.map((item, index) => (
                <CarouselItem className='basis-1/4' key={index}>
                  <ProductCard
                    image={item.image}
                    price={item.price}
                    theme={!(index % 2) ? 'primary' : 'dark'}
                  >
                    {item.children}
                  </ProductCard>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <Image
        width={1920}
        height={1080}
        src='/images/home/discount-banner.png'
        alt='Special Offer'
        className='object-cover w-full h-full shadow-lg shadow-gray-500'
      />
    </section>
  );
};

export default SpecialOffer;

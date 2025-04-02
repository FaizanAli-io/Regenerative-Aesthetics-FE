import React from 'react';
import ReviewCard from '../components/ReviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Reviews = () => {
  return (
    <section className='px-20 py-28'>
      <h2 className='text-6xl text-center font-bold text-primary-variant2 mb-10 '>
        Words From Our Clients
      </h2>
      <Carousel>
        <CarouselContent>
          <CarouselItem className='basis-1/4'>
            <ReviewCard />
          </CarouselItem>
          <CarouselItem className='basis-1/4'>
            <ReviewCard />
          </CarouselItem>
          <CarouselItem className='basis-1/4'>
            <ReviewCard />
          </CarouselItem>
          <CarouselItem className='basis-1/4'>
            <ReviewCard />
          </CarouselItem>
          <CarouselItem className='basis-1/4'>
            <ReviewCard />
          </CarouselItem>
          <CarouselItem className='basis-1/4'>
            <ReviewCard />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Reviews;

{
  /* <div className='flex space-x-5'>
        <ReviewCard />
        {/* <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard /> 
        <ReviewCard />
      </div> */
}

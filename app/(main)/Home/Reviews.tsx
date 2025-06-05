import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import ReviewCard from "@/app/components/ReviewCard";

const Reviews = () => {
  return (
    <section className="px-20 py-28">
      <h2 className="text-6xl text-center font-bold text-primary-variant2 mb-10 ">
        Words From Our Clients
      </h2>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/4">
            <ReviewCard />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
            <ReviewCard />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
            <ReviewCard />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
            <ReviewCard />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
            <ReviewCard />
          </CarouselItem>
          <CarouselItem className="basis-1/4">
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

import React from 'react';
import { StarHalfIcon, StarIcon } from 'lucide-react';
import ReviewBar from '@/app/components/ReviewBar';
import CommentCard from '../_components/CommentCard';
import { Input } from '@/components/ui/input';
import ButtonOutline from '@/app/components/ButtonOutline';

const data = [
  {
    image: '/images/avatars/1.png',
    name: 'Grace Carey',
    date: '24 January,2023',
    rating: 4.5,
    comment:
      'I love how this shampoo makes my hair feel! It’s super soft and has a refreshing scent.',
  },
  {
    image: '/images/avatars/2.png',
    name: 'Ronald Richards',
    date: '24 January,2023',
    rating: 5,
    comment:
      'This is my go-to shampoo! It keeps my scalp clean without drying out my hair.',
  },
  {
    image: '/images/avatars/3.png',
    name: 'Darcy King',
    date: '24 January,2023',
    rating: 4,
    comment: 'I noticed less frizz after just a week of use! Highly recommend.',
  },
];

const ReviewSummary = () => {
  return (
    <section className='px-20 py-28'>
      <h2 className='text-4xl font-medium mb-15'>Reviews</h2>
      <div className='flex space-x-20 items-center'>
        <div>
          <h3 className='text-primary-darker text-7xl'>4.8</h3>
          <p className='text-primary-darker/70 text-xl'>of 125 reviews</p>
          <div className='flex space-x-20'>
            <div className='flex items-center'>
              <StarIcon size='25' color='#ffb547' fill='#ffb547' />
              <StarIcon size='25' color='#ffb547' fill='#ffb547' />
              <StarIcon size='25' color='#ffb547' fill='#ffb547' />
              <StarIcon size='25' color='#ffb547' fill='#ffb547' />
              <StarIcon size='25' color='#ffb547' fill='#ffb547' />
              <StarHalfIcon size='25' color='#ffb547' fill='#ffb547' />
            </div>
          </div>
        </div>
        <div className='space-y-2 w-full'>
          <ReviewBar remarks='Excellent' value={90} reviewsCount={100} />
          <ReviewBar remarks='Good' value={70} reviewsCount={11} />
          <ReviewBar remarks='Average' value={60} reviewsCount={3} />
          <ReviewBar remarks='Below Average' value={40} reviewsCount={8} />
          <ReviewBar remarks='Poor' value={40} reviewsCount={1} />
        </div>
      </div>
      <Input
        placeholder='Leave a Comment'
        className='w-full my-10 placeholder:text-xl text-2xl py-8 px-5'
      />
      <div className='space-y-5'>
        {data.map((item, index) => (
          <CommentCard
            key={index}
            image={item.image}
            name={item.name}
            date={item.date}
            rating={item.rating}
            comment={item.comment}
          />
        ))}

        <div className='flex justify-center w-full'>
          <ButtonOutline className='mx-auto'>View More</ButtonOutline>
        </div>
      </div>
    </section>
  );
};

export default ReviewSummary;

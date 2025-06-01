import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  image: string;
  author: string;
  date: string;
  title: string;
  text: string;
  variant?: 'vertical' | 'horizontal';
}

const BlogCard = ({ image, author, date, title, text, variant }: Props) => {
  return (
    <article
      className={cn({
        'grid grid-cols-2 gap-5': variant === 'horizontal' || !variant,
        'space-y-5': variant === 'vertical',
      })}
    >
      <Image
        className='w-full object-cover'
        src={image}
        width={500}
        height={500}
        alt='alt text.'
      />
      <div className='flex flex-col space-y-3'>
        <p className='text-lg mb-0'>
          {author} - {date}
        </p>
        <h3 className='text-3xl font-semibold text-primary-darker my-2'>
          {title}
        </h3>
        <p className='text-lg'>{text}</p>
        <div className='flex space-x-2'>
          <Button className='rounded-full text-[1rem] p-5 font-normal bg-primary-darker hover:bg-dark cursor-pointer'>
            Health
          </Button>
          <Button
            variant='outline'
            className='rounded-full text-[1rem] p-5 font-normal  cursor-pointer border-dark'
          >
            Health
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;

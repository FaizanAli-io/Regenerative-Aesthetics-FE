import { StarHalfIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  image: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const CommentCard = ({ image, name, date, rating, comment }: Props) => {
  return (
    <article className='flex bg-subtle-gray space-x-5 px-5 py-10 rounded-lg'>
      <Image
        src={image}
        width={200}
        height={200}
        alt='user image'
        className='object-cover w-20 h-20 rounded-full'
      />
      <div className='space-y-2 w-full '>
        <div className='flex justify-between'>
          <h4 className='font-semibold text-lg'>{name}</h4>
          <p className='text-body'>{date}</p>
        </div>
        <div className='flex space-x-1'>
          {Array.from({ length: rating }).map((_, i) => (
            <i key={i}>
              {rating >= i + 1 ? (
                <StarIcon color='#ffb547' fill='#ffb547' size={25} />
              ) : rating >= i + 0.5 ? (
                <StarHalfIcon color='#ffb547' fill='#ffb547' size={25} />
              ) : (
                <StarIcon color='#ffb547' fill='#ffb547' size={25} />
              )}
            </i>
          ))}
        </div>
        <p className='text-lg'>{comment}</p>
      </div>
    </article>
  );
};

export default CommentCard;

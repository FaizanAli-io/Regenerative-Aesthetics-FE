import Image from 'next/image';
import React from 'react';

const BlogCard = () => {
  return (
    <article className='flex space-x-5'>
      <Image
        className='rounded-full w-20 h-20'
        src='/images/avatars/1.png'
        alt='Author'
        width={200}
        height={200}
      />
      <div>
        <h2 className='text-xl font-bold'>
          The Best Ingredients for Your Skin Type
        </h2>
        <p className='text-gray-500'>Bobur Mavlonov - Apr 20</p>
      </div>
    </article>
  );
};

export default BlogCard;

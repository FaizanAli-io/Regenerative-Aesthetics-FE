import React from 'react';
import Image from 'next/image';

const BlogCover = () => {
  return (
    <header className='h-screen'>
      <Image
        src='/images/blog/cover.png'
        alt='Blog Cover'
        width={1920}
        height={1080}
        className='h-full w-full object-cover'
      />
    </header>
  );
};

export default BlogCover;

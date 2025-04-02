import React from 'react';
import BlogCard from '../_components/BlogCard';

const ReadNext = () => {
  return (
    <section className='px-20 my-24'>
      <div className='space-y-5'>
        <h2 className='font-bold text-3xl text-primary-darker'>Read next</h2>
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  );
};

export default ReadNext;

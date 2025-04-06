import BlogCard from '@/app/components/BlogCard';
import React from 'react';

const data = [
  {
    image: '/images/home/highlight-1.png',
    title: 'Understanding the Science Behind Biologics',
    text: 'Discover how biologic treatments are transforming healthcare and what makes them different from traditional medicines.',
    author: 'Emily Carter',
    date: '20 Jan 2024',
  },
  {
    image: '/images/home/highlight-2.png',
    title: 'Essential Skincare Tips for Radiant Skin',
    text: 'Learn dermatologist-approved tips to keep your skin healthy and glowing all year round.',
    author: 'Dr. Alex Morgan',
    date: '19 Jan 2024',
  },
  {
    image: '/images/home/highlight-3.png',
    title: 'Essential Skincare Tips for Radiant Skin',
    text: 'Learn dermatologist-approved tips to keep your skin healthy and glowing all year round.',
    author: 'Dr. Alex Morgan',
    date: '19 Jan 2024',
  },
  {
    image: '/images/home/highlight-4.png',
    title: 'Essential Skincare Tips for Radiant Skin',
    text: 'Learn dermatologist-approved tips to keep your skin healthy and glowing all year round.',
    author: 'Dr. Alex Morgan',
    date: '19 Jan 2024',
  },
];

const BlogHighlight = () => {
  return (
    <div className='px-20 py-24'>
      <h2 className='text-primary-darker uppercase text-7xl mb-15 font-bold text-center'>
        Blog Highlights
      </h2>
      <div className='grid grid-cols-2 space-x-6'>
        <BlogCard {...data[0]} variant='vertical' />
        <div className='flex flex-col space-y-6'>
          {data.slice(1, 4).map((item, index) => (
            <BlogCard key={index} {...item} variant='horizontal' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHighlight;

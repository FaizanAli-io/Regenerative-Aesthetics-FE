'use client';

import React from 'react';
import Block from '@/app/components/Block';
import BlogCard from '@/app/components/BlogCard';
import BlogGridSkeleton from '@/app/components/BlogGridSkeleton';
import { useBlogs } from '@/lib/hooks/blogs/use-blogs';

const BlogsGrid = () => {
  const { data: blogs, isLoading, isFetching } = useBlogs();

  return (
    <main className='min-h-screen bg-white'>
      <Block className='py-16'>
        <div className='space-y-12'>
          {/* Header Section */}
          <div className='text-center space-y-4'>
            <h1 className='text-6xl font-bold text-primary-darker'>Our Blog</h1>
            <p className='text-xl text-body max-w-2xl mx-auto'>
              Discover insights, tips, and stories about health, wellness, and
              beauty from our experts
            </p>
          </div>
          {/* Blogs Grid */}
          <div className='space-y-12'>
            {isLoading || isFetching ? (
              <BlogGridSkeleton
                itemCount={3}
                variant='horizontal'
                showHeader={false}
              />
            ) : blogs && blogs.length > 0 ? (
              // Blogs List
              <div className='grid gap-12'>
                {blogs.map(blog => (
                  <BlogCard key={blog.id} blog={blog} variant='horizontal' />
                ))}
              </div>
            ) : (
              // Empty State
              <div className='text-center py-16'>
                <div className='mx-auto w-24 h-24 bg-subtle-gray rounded-full flex items-center justify-center mb-6'>
                  <svg
                    className='w-12 h-12 text-body'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
                    />
                  </svg>
                </div>
                <h3 className='text-2xl font-semibold text-primary-darker mb-2'>
                  No blogs available yet
                </h3>
                <p className='text-body'>
                  Check back soon for new articles and insights from our team.
                </p>
              </div>
            )}
          </div>
        </div>
      </Block>
    </main>
  );
};

export default BlogsGrid;

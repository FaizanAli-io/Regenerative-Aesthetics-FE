'use client';

import React from 'react';
import Image from 'next/image';
import { useBlogs } from '@/lib/hooks/blogs/use-blogs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { findBlogBySlug } from '@/lib/utils/blog-utils';

interface Props {
  params: {
    slug: string;
  };
}

const BlogDetailPage = ({ params }: Props) => {
  const router = useRouter();
  const { data: blogs, isLoading, isError } = useBlogs();

  // Find the blog by slug
  const blog = blogs ? findBlogBySlug(blogs, params.slug) : null;

  if (isLoading) {
    return (
      <div className='min-h-screen'>
        {/* Header Skeleton */}
        <div className='h-screen relative'>
          <Skeleton className='w-full h-full' />
        </div>

        {/* Content Skeleton */}
        <section className='px-20 my-28'>
          <div className='space-y-6'>
            <Skeleton className='h-16 w-3/4' />
            <div className='flex space-x-4'>
              <Skeleton className='h-10 w-32' />
              <Skeleton className='h-10 w-24' />
              <Skeleton className='h-10 w-28' />
            </div>
            <div className='space-y-4'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
          </div>
        </section>
      </div>
    );
  }
  if (isError || (!isLoading && !blog)) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Blog Not Found
          </h1>
          <p className='text-gray-600 mb-8'>
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/blogs')} className='gap-2'>
            <ArrowLeft className='w-4 h-4' />
            Back to Blogs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Blog Cover */}
      <header className='h-screen relative'>
        <Image
          src={blog.image_url}
          alt={blog.title}
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black/20' />

        {/* Back Button */}
        <div className='absolute top-8 left-8 z-10'>
          <Button
            variant='outline'
            onClick={() => router.push('/blogs')}
            className='gap-2 bg-white/90 hover:bg-white'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Blogs
          </Button>
        </div>
      </header>

      {/* Blog Content */}
      <section className='px-20 my-28'>
        <header className='mb-12'>
          <h1 className='text-7xl font-bold text-primary-darker mb-8'>
            {blog.title}
          </h1>

          {/* Tags - you can customize these or make them dynamic */}
          <div className='flex space-x-4 mb-8'>
            <Button variant='outline' className='rounded-full'>
              #Skincare
            </Button>
            <Button variant='outline' className='rounded-full'>
              #Beauty
            </Button>
            <Button variant='outline' className='rounded-full'>
              #Health
            </Button>
          </div>
        </header>

        <main className='prose prose-lg max-w-none'>
          <div className='text-lg leading-relaxed whitespace-pre-wrap'>
            {blog.content}
          </div>
        </main>
      </section>

      {/* Related Blogs Section */}
      <section className='px-20 my-24'>
        <div className='space-y-8'>
          <h2 className='font-bold text-3xl text-primary-darker'>Read next</h2>
          <div className='text-center py-12'>
            <p className='text-gray-600 mb-4'>
              More blog recommendations coming soon!
            </p>
            <Button onClick={() => router.push('/blogs')} variant='outline'>
              Browse All Blogs
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;

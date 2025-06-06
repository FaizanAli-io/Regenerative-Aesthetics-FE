import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Blog } from '@/lib/services/blog-service';
import { createSlug } from '@/lib/utils/blog-utils';

interface Props {
  blog: Blog;
  variant?: 'vertical' | 'horizontal';
}

const BlogCard = ({ blog, variant }: Props) => {
  return (
    <article
      className={cn({
        'grid grid-cols-2 gap-5': variant === 'horizontal' || !variant,
        'space-y-5': variant === 'vertical',
      })}
    >
      <Image
        className='w-full object-cover'
        src={blog.image_url}
        width={500}
        height={500}
        alt={blog.title}
      />
      <div className='flex flex-col space-y-3'>
        <h3 className='text-3xl font-semibold text-primary-darker my-2'>
          {blog.title}
        </h3>
        <p className='text-lg line-clamp-3'>{blog.content}</p>{' '}
        <div className='flex space-x-2'>
          <Link href={`/blogs/${createSlug(blog.title)}`}>
            <Button className='rounded-full text-[1rem] p-5 font-normal bg-primary-darker hover:bg-dark cursor-pointer'>
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;

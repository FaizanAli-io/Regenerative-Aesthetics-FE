import { useCategories } from '@/lib/hooks/categories/use-categories';
import Link from 'next/link';
import React from 'react';
import SubnavSkeleton from './SubnavSkeleton';

const SubNav = () => {
  const { data: categories, isLoading, isFetched } = useCategories();

  if (isLoading || (!categories.length && !isFetched))
    return <SubnavSkeleton />;

  return (
    <div className='bg-dark '>
      <ul className='list-none flex justify-center py-3 divide-x divide-body'>
        {categories.slice(0, Math.min(categories.length, 10)).map(item => (
          <Link href={`/products/${item.id}`} key={item.id}>
            <li className='text-body mx-2'>{item.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SubNav;

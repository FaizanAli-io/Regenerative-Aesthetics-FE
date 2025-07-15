'use client';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useCategories } from '@/lib/hooks/categories/use-categories';

interface Props extends HTMLAttributes<HTMLDivElement> {
  categoryId?: number;
}

function ProductBreadcrumbs({ className, categoryId, ...props }: Props) {
  const { data: categories } = useCategories();
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (!categoryId || !categories || !categories.length) return;

    const target = categories.find(c => c.id === categoryId);

    setCategory(target?.title || '');
  }, [categories]);

  return (
    <Breadcrumb className={className} {...props}>
      <BreadcrumbList className='text-lg font-semibold'>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/products'>Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {category && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{category}</BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default ProductBreadcrumbs;

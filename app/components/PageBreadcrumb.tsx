import React from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  items: { name: string; href: string }[];
  currentItem: string;
}

function PageBreadcrumbs({ items, currentItem, className, ...props }: Props) {
  return (
    <Breadcrumb className={className} {...props}>
      <BreadcrumbList className='text-lg font-semibold'>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className='font-semibold text-primary-darker'>
            {currentItem}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default PageBreadcrumbs;

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

function ProductBreadcrumbs({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <Breadcrumb className={className} {...props}>
      {' '}
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
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className='font-semibold text-primary-darker'>
            Hair Products
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default ProductBreadcrumbs;

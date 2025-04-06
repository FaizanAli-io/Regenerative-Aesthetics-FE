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

function AccountBreadCrumbs({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <Breadcrumb className={className} {...props}>
      <BreadcrumbList className='text-lg font-semibold'>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href='/'>Account</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className='font-semibold text-primary-darker'>
            Favourites
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default AccountBreadCrumbs;

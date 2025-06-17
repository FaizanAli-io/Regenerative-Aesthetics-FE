'use client';

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
import { ProtectedPage } from '@/app/components/ProtectedPage';
import { usePathname } from 'next/navigation';
import { navItems } from '../navItems';

function AccountBreadCrumbs({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();

  return (
    <ProtectedPage>
      <Breadcrumb className={className} {...props}>
        <BreadcrumbList className='text-lg font-semibold'>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Account</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='font-semibold text-primary-darker'>
              {navItems[pathname]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </ProtectedPage>
  );
}

export default AccountBreadCrumbs;

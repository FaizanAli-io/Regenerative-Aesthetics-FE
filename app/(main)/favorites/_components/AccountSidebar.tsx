'use client';
import useAccountSidebarStore from '@/lib/stores/account-sidebar-store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { navItems } from '../../profile/navItems';

const AccountSidebar = () => {
  const pathname = usePathname();

  return (
    <ul className='divide-y divide-gray-500'>
      {Object.entries(navItems).map(([path, name], index) => (
        <li
          key={index}
          className={cn(
            'flex items-center justify-between py-4 px-6 text-xl font-medium hover:bg-gray-100 cursor-pointer',
            pathname === path
              ? 'bg-gray-100 text-primary font-semibold border-l-4 border-primary'
              : 'text-primary-darker'
          )}
        >
          <Link href={path}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default AccountSidebar;

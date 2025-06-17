'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { removeToken, removeUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { navItems } from '../navItems';
import { Button } from '@/components/ui/button';

const AccountSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    removeToken();
    removeUser();
    router.replace('/auth');
  };

  return (
    <ul className='divide-y divide-gray-400'>
      {Object.entries(navItems).map(([path, name], index) => (
        <li
          key={index}
          className={cn(
            'flex items-center justify-between py-4 px-6 text-lg font-medium hover:bg-gray-100 cursor-pointer',
            pathname === path
              ? 'bg-gray-100 text-primary font-semibold border-l-4 border-primary'
              : 'text-primary-darker'
          )}
        >
          <Link href={path}>{name}</Link>
        </li>
      ))}

      <li className='flex items-center py-4 px-6  font-medium hover:bg-gray-100 cursor-pointer space-x-2'>
        <Button
          disabled={isLoading}
          className='text-lg p-0 text-primary-darker'
          onClick={handleLogout}
          variant={'ghost'}
        >
          {isLoading ? 'Signing out...' : 'Signout'}
        </Button>
      </li>
    </ul>
  );
};

export default AccountSidebar;

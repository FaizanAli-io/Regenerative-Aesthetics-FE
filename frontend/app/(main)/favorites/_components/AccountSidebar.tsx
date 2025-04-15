'use client';
import useAccountSidebarStore from '@/lib/stores/account-sidebar-store';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

// const data = ['Personal Information', 'Orders', 'Favorites', 'Reviews'];
const data = ['Personal Information', 'Orders', 'Favorites'];

const AccountSidebar = () => {
  const setActiveIndex = useAccountSidebarStore(state => state.setActiveIndex);
  const activeIndex = useAccountSidebarStore(state => state.activeIndex);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul className='divide-y divide-gray-500'>
      {data.map((item, index) => (
        <li
          key={index}
          className={cn(
            'flex items-center justify-between py-4 px-6 text-xl font-medium hover:bg-gray-100 cursor-pointer',
            activeIndex === index
              ? 'bg-gray-100 text-primary font-semibold border-l-4 border-primary'
              : 'text-primary-darker'
          )}
          onClick={() => handleClick(index)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default AccountSidebar;

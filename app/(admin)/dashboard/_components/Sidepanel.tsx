'use client';

import React from 'react';
import NavItem from './NavItem';
import useSidebarStore from '@/lib/stores/dashboard-sidebar-store';

const sections = [
  {
    icon: 'orders',
    label: 'Orders',
  },
  {
    icon: 'products',
    label: 'Products',
  },
  {
    icon: 'users',
    label: 'Users',
  },
  {
    icon: 'categories',
    label: 'Categories',
  },
];

const Sidepanel = () => {
  const activeIndex = useSidebarStore(state => state.activeIndex);

  return (
    <div className='hidden md:flex w-64 flex-col bg-[#f0f9f0] border-r'>
      <div className='flex items-center gap-2 p-4 border-b'>
        <div className='w-6 h-6 bg-green-600 rounded-md flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-4 h-4'
          >
            <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
            <polyline points='9 22 9 12 15 12 15 22' />
          </svg>
        </div>
        <span className='font-semibold text-gray-800'>Admin Panel</span>
      </div>
      <nav className='flex-1 p-4 space-y-2'>
        {sections.map((section, i) => (
          <NavItem
            key={section.label}
            index={i}
            icon={section.icon}
            label={section.label}
            active={i === activeIndex}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidepanel;

'use client';

import React from 'react';
import AccountBreadCrumbs from './_components/AccountBreadCrumbs';
import AccountSidebar from './_components/AccountSidebar';
import FavoritesGrid from './FavoritesGrid';
import useAccountSidebarStore from '@/lib/stores/account-sidebar-store';
import ProfileOrdersSection from './_sections/ProfileOrdersSection';

const Page = () => {
  const activeIndex = useAccountSidebarStore(state => state.activeIndex);

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <div className='p-4'>Personal Information Content</div>;
      case 1:
        return <ProfileOrdersSection />;
      case 2:
        return <FavoritesGrid />;
      case 3:
        return <div className='p-4'>Reviews Content</div>;
      default:
        return <FavoritesGrid />;
    }
  };

  return (
    <div className='px-20 py-15'>
      <AccountBreadCrumbs className='mb-15 ml-10' />
      <div className='grid grid-cols-4 space-x-10'>
        <AccountSidebar />
        <div className='col-span-3'>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Page;

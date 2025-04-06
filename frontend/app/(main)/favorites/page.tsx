import React from 'react';
import AccountBreadCrumbs from './_components/AccountBreadCrumbs';
import AccountSidebar from './_components/AccountSidebar';
import FavoritesGrid from './FavoritesGrid';

const Page = () => {
  return (
    <div className='px-20 py-15'>
      <AccountBreadCrumbs className='mb-15 ml-10' />
      <div className='grid grid-cols-4 space-x-10'>
        <AccountSidebar />
        <div className='col-span-3'>
          <FavoritesGrid />
        </div>
      </div>
    </div>
  );
};

export default Page;

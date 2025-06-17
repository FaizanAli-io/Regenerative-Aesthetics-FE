import React from 'react';
import AccountBreadCrumbs from '../favorites/_components/AccountBreadCrumbs';
import AccountSidebar from '../favorites/_components/AccountSidebar';

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='px-20 py-15'>
      <AccountBreadCrumbs className='mb-15 ml-10' />
      <div className='grid grid-cols-4 space-x-10'>
        <AccountSidebar />
        <div className='col-span-3'>{children}</div>
      </div>
    </div>
  );
}

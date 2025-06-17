import React from 'react';
import AccountBreadCrumbs from './_components/AccountBreadCrumbs';
import AccountSidebar from './_components/AccountSidebar';
import { getUser } from '@/lib/auth';
import { ProtectedPage } from '@/app/components/ProtectedPage';

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedPage>
      <div className='px-20 py-15'>
        <AccountBreadCrumbs className='mb-15 ml-10' />
        <div className='grid grid-cols-4 space-x-10'>
          <AccountSidebar />
          <div className='col-span-3'>{children}</div>
        </div>
      </div>
    </ProtectedPage>
  );
}

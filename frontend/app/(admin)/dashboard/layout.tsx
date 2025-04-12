import React from 'react';
import Sidebar from './_components/Sidepanel';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='flex h-screen w-full bg-white'>
        <Sidebar />
        <div className='flex-1 flex flex-col overflow-hidden'>
          {/* Header */}
          <header className='flex items-center justify-between p-4 border-b'>
            <div className='md:hidden'>
              <Button variant='ghost' size='icon'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-6 h-6'
                >
                  <line x1='3' y1='12' x2='21' y2='12' />
                  <line x1='3' y1='6' x2='21' y2='6' />
                  <line x1='3' y1='18' x2='21' y2='18' />
                </svg>
              </Button>
            </div>
            <div className='flex items-center ml-auto gap-2'>
              <Button variant='ghost' size='icon' className='relative'>
                <Bell className='h-5 w-5' />
                <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
              </Button>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='/placeholder-user.jpg' alt='User' />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </header>
          {children}
        </div>
      </div>
    </>
  );
}

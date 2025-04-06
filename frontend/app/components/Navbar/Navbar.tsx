'use client';

import React from 'react';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import Image from 'next/image';
import SearchField from '../SearchField';
import NavLink from './NavLink';
import NavIcon from './NavIcon';
import SubNav from './SubNav';
import { useAuth } from '@/lib/hooks/use-auth';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <NavigationMenu className='px-10 w-full justify-stretch my-2'>
        <div className='flex w-full gap-15 list-none items-center'>
          <Link href='/'>
            <Image
              src='/images/logo.svg'
              alt='Favorites'
              width='200'
              height='100'
            />
          </Link>

          <div className='flex-1'>
            <SearchField className='w-full' />
          </div>

          <div className='flex gap-4 justify-center items-center'>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/products'>Products</NavLink>
            <NavLink href='/contact'>Contact Us</NavLink>
          </div>

          <div className='flex gap-2 justify-center items-center'>
            <NavIcon href='/favorites' src='/icons/heart.svg' alt='Favorites' />
            <NavIcon href='/cart' src='/icons/cart.svg' alt='Cart' />
            {isAuthenticated ? (
              <NavIcon href='/favorites' src='/icons/user.svg' alt='Profile' />
            ) : (
              <NavIcon href='/login' src='/icons/user.svg' alt='Login' />
            )}
          </div>
        </div>
      </NavigationMenu>
      <SubNav />
    </>
  );
};

export default Navbar;

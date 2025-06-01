'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClass = isActive
    ? 'text-primary-darker font-semibold'
    : 'text-primary-darker/50';

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={cn('text-md', activeClass)}>
        <Link href={href}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default NavLink;

import React from 'react';
import NavLink from './NavLink';
import Image from 'next/image';

const ICON_SIZE = 28;

interface Props {
  href: string;
  src: string;
  alt: string;
}

const NavIcon = ({ href, src, alt }: Props) => {
  return (
    <NavLink href={href}>
      <Image
        src={src}
        alt={alt}
        // src='/icons/cart.svg'
        // alt='Favorites'
        width={ICON_SIZE}
        height={ICON_SIZE}
      />
    </NavLink>
  );
};

export default NavIcon;

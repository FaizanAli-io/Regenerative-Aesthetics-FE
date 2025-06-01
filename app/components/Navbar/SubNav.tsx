import Link from 'next/link';
import React from 'react';

const data = [
  { label: 'Shampoo & Conditioner', href: '#' },
  { label: 'Hair Treatments & Oils', href: '#' },
  { label: 'Styling & Heat Protection', href: '#' },
  { label: 'Face Care Essentials', href: '#' },
  { label: 'Target Skin Care', href: '#' },
  { label: 'Lip & Eye Care', href: '#' },
];

const SubNav = () => {
  return (
    <div className='bg-dark '>
      <ul className='list-none flex justify-center py-3 divide-x divide-body'>
        {data.map((item, index) => (
          <Link href={item.href} key={index}>
            <li className='text-body mx-2'>{item.label}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SubNav;

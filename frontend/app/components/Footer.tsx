import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-primary-variant2 text-white text-lg'>
      <div className='px-20 py-28 '>
        <div className='grid grid-cols-3'>
          <div className='space-y-5'>
            <Image
              src='/images/logo-white.svg'
              alt='Favorites'
              width='200'
              height='100'
            />
            <p>
              We bring you premium hair and skincare essentials, carefully
              curated for ultimate nourishment and beauty
            </p>
          </div>
          <div>
            <ul className='space-y-5 text-xl ml-28'>
              <li className='font-semibold'>Services</li>
              <li>Haircare Bundle</li>
              <li>Skincare Kits</li>
              <li>Special Discount</li>
              <li>Service contract</li>
              <li>New Arrivals</li>
              <li>Payment Options</li>
            </ul>
          </div>
          <div>
            <ul className='space-y-5 text-xl'>
              <li className='font-semibold'>Assistance to the buyer</li>
              <li>Find an order</li>
              <li>Terms of delivery</li>
              <li>Exchange and return of goods</li>
              <li>Guarantee</li>
              <li>Product Authenticity Guarantee</li>
              <li>Terms of use of the site</li>
            </ul>
          </div>
        </div>
        <div className='flex space-x-8'>
          <Link href='#'>
            <Image
              src='/icons/twitter.svg'
              alt='Twitter'
              width={40}
              height={40}
            />
          </Link>
          <Link href='#'>
            <Image src='/icons/fb.svg' alt='Facebook' width={20} height={20} />
          </Link>
          <Link href='#'>
            <Image src='/icons/tiktok.svg' alt='tikto' width={35} height={35} />
          </Link>
          <Link href='#'>
            <Instagram size={40} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

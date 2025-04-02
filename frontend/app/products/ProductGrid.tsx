import React from 'react';
import ProductCard from '../components/ProductCard';
import { Label } from '@/components/ui/label';
import ProductSortDropdown from './ProductSortDropdown';

interface CardData {
  image: string;
  price: string;
  theme?: 'light' | 'dark' | 'primary';
  children: React.ReactNode;
}

const data: CardData[] = [
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Living Proof <br />
        Frizz Free Shampoo
      </p>
    ),
    price: '$900',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        GOPURE
        <br />
        Eye Cream
      </p>
    ),
    price: '$2535',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Living Proof <br />
        Frizz Free Shampoo
      </p>
    ),
    price: '$900',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        GOPURE
        <br />
        Eye Cream
      </p>
    ),
    price: '$2535',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
];

const ProductGrid = () => {
  return (
    <div className='space-y-10'>
      <div className='flex justify-between w-full items-end'>
        <Label className='text-body text-lg'>
          Selected Products: <span className='text-black text-2xl'>85</span>
        </Label>

        <ProductSortDropdown />
      </div>
      <div className='grid grid-cols-4 grid-rows-3 gap-5'>
        {data.map((item, index) => (
          <ProductCard
            image={item.image}
            price={item.price}
            theme={'light'}
            key={index}
          >
            {item.children}
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

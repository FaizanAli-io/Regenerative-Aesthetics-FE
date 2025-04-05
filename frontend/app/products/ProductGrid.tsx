'use client';

import React from 'react';
import ProductCard from '../components/ProductCard';
import { Label } from '@/components/ui/label';
import ProductSortDropdown from './ProductSortDropdown';
import { useProducts } from '@/lib/hooks/use-products';
import Loader from '../components/Loader';

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
  const { data: products, isLoading } = useProducts();

  return (
    <div className='space-y-10'>
      <div className='flex justify-between w-full items-end'>
        <Label className='text-body text-lg'>
          Selected Products:{' '}
          <span className='text-black text-2xl'>
            {products && products.length}
          </span>
        </Label>
        <ProductSortDropdown />
      </div>
      <div className='grid grid-cols-4 grid-rows-3 gap-5'>
        {isLoading && <Loader />}

        {products?.map(product => (
          <ProductCard
            image='/images/home/shampoo.png'
            price={product.price}
            theme={'light'}
            key={product.id}
          >
            <p>{product.title}</p>
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

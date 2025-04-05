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

const ProductGrid = () => {
  const { data: products, isLoading } = useProducts();
  console.log('products', products);

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

        {products &&
          products?.map(product => (
            <ProductCard
              product={product}
              // image='/images/home/shampoo.png'
              // price={product.price}
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

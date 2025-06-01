'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import ProductSortDropdown from './ProductSortDropdown';
import { useProducts } from '@/lib/hooks/products/use-products';
import Loader from '@/app/components/Loader';
import ProductCard from '@/app/components/ProductCard';

const ProductGrid = () => {
  const { data: products, isLoading, isError } = useProducts();

  return (
    <div className='space-y-10'>
      <div className='flex justify-between w-full items-end'>
        <Label className='text-body text-lg'>
          Selected Products:{' '}
          <span className='text-black text-2xl'>
            {products && Array.isArray(products) ? products.length : 0}
          </span>
        </Label>
        <ProductSortDropdown />
      </div>
      <div className='grid grid-cols-4 grid-rows-3 gap-5'>
        {isLoading && <Loader />}
        {isError && (
          <div className="col-span-4 text-center text-red-500 p-4">
            Failed to load products
          </div>
        )}
        {products && Array.isArray(products) &&
          products.map(product => (
            <ProductCard product={product} theme={'light'} key={product.id}>
              <p>{product.title}</p>
            </ProductCard>
          ))}
        {!isLoading && !isError && (!products || products.length === 0) && (
          <div className="col-span-4 text-center text-gray-500 p-4">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;

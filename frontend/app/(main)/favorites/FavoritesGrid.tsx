'use client';
import React from 'react';
import { Label } from '@/components/ui/label';
import { useProducts } from '@/lib/hooks/use-products';
import Loader from '@/app/components/Loader';
import ProductCard from '@/app/components/ProductCard';

const FavoritesGrid = () => {
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
      </div>
      <div className='grid grid-cols-4 grid-rows-3 gap-5'>
        {isLoading && <Loader />}

        {products &&
          products?.map(product => (
            <ProductCard product={product} theme={'light'} key={product.id}>
              <p>{product.title}</p>
            </ProductCard>
          ))}
      </div>
    </div>
  );
};

export default FavoritesGrid;

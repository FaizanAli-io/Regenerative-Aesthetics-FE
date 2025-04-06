'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { useProducts } from '@/lib/hooks/use-products';
import Loader from '@/app/components/Loader';
import ProductCard from '@/app/components/ProductCard';
import { useWishlist } from '@/lib/hooks/use-wishlist';

const FavoritesGrid = () => {
  const { data: wishlist, isLoading } = useWishlist();
  const { data: products } = useProducts();

  return (
    <div className='space-y-10'>
      <div className='grid grid-cols-4 grid-rows-3 gap-5'>
        {isLoading && <Loader />}

        {wishlist &&
          wishlist.wishlistItems.length &&
          wishlist.wishlistItems?.map(item => (
            <ProductCard
              product={item.product}
              theme={'light'}
              key={item.id}
              isFavourite
            >
              <p>{item.product.title}</p>
            </ProductCard>
          ))}
      </div>
    </div>
  );
};

export default FavoritesGrid;

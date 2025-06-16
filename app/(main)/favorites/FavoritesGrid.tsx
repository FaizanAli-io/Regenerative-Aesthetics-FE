'use client';

import React, { useCallback } from 'react';
import ProductCard from '@/app/components/ProductCard';
import ProductCardSkeleton from '@/app/components/ProductCardSkeleton';
import { useWishlist } from '@/lib/hooks/wishlist/use-wishlist';

const FavoritesGrid = () => {
  const { data: wishlist, isLoading, isFetching } = useWishlist();
  const renderContent = useCallback(() => {
    if ((isLoading || isFetching) && !wishlist)
      return Array.from({ length: 12 }).map((_, index) => (
        <ProductCardSkeleton key={index} theme='light' />
      ));

    if (wishlist && wishlist.wishlistItems.length)
      return wishlist.wishlistItems.map(item => (
        <ProductCard
          product={item.product}
          theme={'light'}
          key={item.id}
          favorite
        >
          <p>{item.product.title}</p>
        </ProductCard>
      ));

    return (
      <div className='text-gray-500 text-lg text-center col-span-4'>
        <p className='mb-2'>Your wishlist is empty</p>
        <p className='text-sm'>Start adding products you love!</p>
      </div>
    );
  }, [isLoading, isFetching, wishlist]);

  return (
    <div className='space-y-10'>
      <div className='grid grid-cols-4 gap-5'>{renderContent()}</div>
    </div>
  );
};

export default FavoritesGrid;

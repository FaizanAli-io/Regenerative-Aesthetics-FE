'use client';

import React, { useCallback, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard';
import ProductCardSkeleton from '@/app/components/ProductCardSkeleton';
import { useWishlist } from '@/lib/hooks/wishlist/use-wishlist';
import PaginationUI from '@/app/components/PaginationUI';

const ITEMS_PER_PAGE = 12;
const Page = () => {
  const { data: wishlist, isLoading, isFetching } = useWishlist();
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalItems = wishlist ? wishlist.totalItems : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const renderContent = useCallback(() => {
    if ((isLoading || isFetching) && !wishlist)
      return Array.from({ length: 12 }).map((_, index) => (
        <ProductCardSkeleton key={index} theme='light' />
      ));

    if (!wishlist || wishlist.wishlistItems.length === 0) {
      return (
        <div className='text-gray-500 text-lg text-center col-span-4'>
          <p className='mb-2'>Your wishlist is empty</p>
          <p className='text-sm'>Start adding products you love!</p>
        </div>
      );
    }

    const currentProducts = wishlist.wishlistItems.slice(startIndex, endIndex);

    return currentProducts.map(item => (
      <ProductCard
        product={item.product}
        theme={'light'}
        key={item.id}
        favorite
      >
        <p>{item.product.title}</p>
      </ProductCard>
    ));
  }, [isLoading, isFetching, wishlist, startIndex, endIndex]);

  const renderItemsCount = () => {
    if (wishlist && wishlist.totalItems <= ITEMS_PER_PAGE) return null;

    return `Showing ${startIndex + 1}-${endIndex} of ${totalItems}`;
  };

  return (
    <div className='space-y-10'>
      <p className='text-gray-500'>{renderItemsCount()}</p>
      <div className='grid grid-cols-4 gap-5'>{renderContent()}</div>
      {wishlist && wishlist.totalItems > ITEMS_PER_PAGE && (
        <PaginationUI
          limit={wishlist.totalItems}
          pageSize={ITEMS_PER_PAGE}
          initialPage={currentPage}
          onClick={handlePageChange}
        />
      )}
    </div>
  );
};

export default Page;

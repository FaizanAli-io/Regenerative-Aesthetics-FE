'use client';

import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import ProductSortDropdown from './ProductSortDropdown';
import { useProducts } from '@/lib/hooks/products/use-products';
import ProductCard from '@/app/components/ProductCard';
import ProductGridSkeleton from '@/app/components/ProductGridSkeleton';
import { ProductSort, useProductsStore } from '@/lib/stores/products-store';
import { Product } from '@/lib/services/products-service';
import PaginationUI from '@/app/components/PaginationUI';

const ProductGrid = () => {
  const { data: products, isLoading, isError, isFetched } = useProducts();
  const { min, max } = useProductsStore(state => state.priceFilter);
  const sortBy = useProductsStore(state => state.sortBy);
  const categoryFilters = useProductsStore(state => state.categoryFilter);
  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 12;

  const handleSort = React.useCallback(
    (a: Omit<Product, 'category'>, b: Omit<Product, 'category'>) => {
      const aPrice = +a.price;
      const bPrice = +b.price;

      if (sortBy === ProductSort.price) {
        if (aPrice < bPrice) return -1;
        if (aPrice > bPrice) return 1;
      }
      if (sortBy === ProductSort.rating || sortBy === ProductSort.popularity) {
        if (a.reviewCount! < b.reviewCount!) return 1;
        if (a.reviewCount! > b.reviewCount!) return -1;
      }

      if (sortBy === ProductSort.date) {
        const aDate = new Date(a.updatedAt!).getTime();
        const bDate = new Date(b.updatedAt!).getTime();
        return aDate - bDate;
      }

      return 0;
    },
    [sortBy]
  );
  // Filter products based on current filters
  const filteredProducts = React.useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    return products
      .filter(product => categoryFilters[product.category.title])
      .filter(product => +product.price >= min && +product.price <= max)
      .sort((a, b) => handleSort(a, b));
  }, [products, categoryFilters, min, max, sortBy, handleSort]);

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [min, max, sortBy, categoryFilters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='space-y-10'>
      {isLoading || !products.length ? (
        <ProductGridSkeleton itemCount={10} theme='light' />
      ) : (
        <>
          {' '}
          <div className='flex justify-between w-full items-end'>
            <Label className='text-body text-lg'>
              Selected Products:{' '}
              <span className='text-black text-2xl'>{totalItems}</span>
              {totalItems > 0 && (
                <span className='text-sm text-gray-500 ml-2'>
                  (Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{' '}
                  {totalItems})
                </span>
              )}
            </Label>
            <ProductSortDropdown />
          </div>
          <div className='grid grid-cols-4 gap-5'>
            {isError && (
              <div className='col-span-4 text-center text-red-500 p-4'>
                Failed to load products
              </div>
            )}
            {currentProducts.map(product => (
              <ProductCard product={product} theme={'light'} key={product.id}>
                <p>{product.title}</p>
              </ProductCard>
            ))}
            {!isError && isFetched && totalItems === 0 && (
              <div className='col-span-4 text-center text-gray-500 p-4'>
                No products found
              </div>
            )}
          </div>
          {/* Pagination */}
          {totalItems > ITEMS_PER_PAGE && (
            <PaginationUI
              limit={totalItems}
              pageSize={ITEMS_PER_PAGE}
              initialPage={currentPage}
              onClick={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;

'use client';

import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import ProductSortDropdown from './ProductSortDropdown';
import { useProducts } from '@/lib/hooks/products/use-products';
import Loader from '@/app/components/Loader';
import ProductCard from '@/app/components/ProductCard';
import { ProductSort, useProductsStore } from '@/lib/stores/products-store';
import { Product } from '@/lib/services/products-service';

const ProductGrid = () => {
  const { data: products, isLoading, isError } = useProducts();
  const { min, max } = useProductsStore(state => state.priceFilter);
  const sortBy = useProductsStore(state => state.sortBy);
  const categoryFilters = useProductsStore(state => state.categoryFilter);

  const handleSort = (
    a: Omit<Product, 'category'>,
    b: Omit<Product, 'category'>
  ) => {
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
  };

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
          <div className='col-span-4 text-center text-red-500 p-4'>
            Failed to load products
          </div>
        )}
        {products &&
          Array.isArray(products) &&
          products
            .filter(product => categoryFilters[product.category.title])
            .filter(product => +product.price >= min && +product.price <= max)
            .sort((a, b) => handleSort(a, b))
            .map(product => (
              <ProductCard product={product} theme={'light'} key={product.id}>
                <p>{product.title}</p>
              </ProductCard>
            ))}
        {!isLoading && !isError && (!products || products.length === 0) && (
          <div className='col-span-4 text-center text-gray-500 p-4'>
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;

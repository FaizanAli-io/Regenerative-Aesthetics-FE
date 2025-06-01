'use client';

import { useCategories } from '@/lib/hooks/categories/use-categories';
import ProductPriceFilterAccordion from './ProductPriceFilterAccordion';
import ProductSidebarAccordion from './ProductSidebarAccordion';

function ProductSidebar() {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <div className='divide-y divide-gray-200'>
      <ProductPriceFilterAccordion />
      {isLoading && (
        <div className='p-4 text-center text-gray-500'>
          Loading categories...
        </div>
      )}
      {isError && (
        <div className='p-4 text-center text-red-500'>
          Failed to load categories
        </div>
      )}
      {categories &&
        Array.isArray(categories) &&
        categories.map(category => (
          <ProductSidebarAccordion
            key={category.id}
            items={category.children}
            title={category.title}
          />
        ))}
    </div>
  );
}

export default ProductSidebar;

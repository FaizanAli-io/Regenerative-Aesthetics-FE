'use client';

import { useCategories } from '@/lib/hooks/categories/use-categories';
import ProductPriceFilterAccordion from './ProductPriceFilterAccordion';
import ProductSidebarAccordion from './ProductSidebarAccordion';
import ProductSidebarSkeleton from '@/app/components/ProductSidebarSkeleton';

function ProductSidebar() {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <div className='divide-y divide-gray-200'>
      <ProductPriceFilterAccordion />
      {isLoading || !categories.length ? (
        <ProductSidebarSkeleton accordionCount={4} itemsPerAccordion={4} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default ProductSidebar;

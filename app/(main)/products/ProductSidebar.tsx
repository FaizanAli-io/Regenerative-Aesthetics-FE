'use client';

import { useCategories } from '@/lib/hooks/categories/use-categories';
import ProductPriceFilterAccordion from './ProductPriceFilterAccordion';
import ProductSidebarAccordion from './ProductSidebarAccordion';
import ProductSidebarSkeleton from '@/app/components/ProductSidebarSkeleton';
import { useEffect, useState } from 'react';
import { Category } from '@/lib/services/category-services';

interface Props {
  categoryId?: number;
}

function ProductSidebar({ categoryId }: Props) {
  const { data: categories, isLoading, isError } = useCategories();
  const [finalCategories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!categoryId) return setCategories(categories);

    const targets = categories.filter(c => c.id === categoryId);

    setCategories(targets);
  }, [categories]);

  return (
    <div className='divide-y divide-gray-200'>
      <ProductPriceFilterAccordion />
      {isLoading || !finalCategories.length ? (
        <ProductSidebarSkeleton accordionCount={4} itemsPerAccordion={4} />
      ) : (
        <>
          {isError && (
            <div className='p-4 text-center text-red-500'>
              Failed to load categories
            </div>
          )}
          {finalCategories &&
            Array.isArray(finalCategories) &&
            finalCategories.map(category => (
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

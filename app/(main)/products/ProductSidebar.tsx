'use client';

import { useCategories } from '@/lib/hooks/categories/use-categories';
import ProductPriceFilterAccordion from './ProductPriceFilterAccordion';
import ProductSidebarAccordion from './ProductSidebarAccordion';

function ProductSidebar() {
  const { data: categories } = useCategories();

  return (
    <div className='divide-y divide-gray-200'>
      <ProductPriceFilterAccordion />
      {categories &&
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

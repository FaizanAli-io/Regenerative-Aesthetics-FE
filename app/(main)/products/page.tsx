import React from 'react';
import ProductGrid from './ProductGrid';
import ProductSidebar from './ProductSidebar';
import ProductBreadcrumbs from './ProductBreadcrumbs';

const Page = () => {
  return (
    <div className='px-20 py-15'>
      <ProductBreadcrumbs className='mb-15 ml-10' />
      <div className='grid grid-cols-4 space-x-10'>
        <ProductSidebar />
        <div className='col-span-3'>
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default Page;

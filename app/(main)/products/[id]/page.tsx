import React from 'react';
import ProductGrid from '../ProductGrid';
import ProductBreadcrumbs from '../ProductBreadcrumbs';
import ProductSidebar from '../ProductSidebar';

interface Props {
  params: {
    id: string;
  };
}

const Page = async (props: Props) => {
  const id = await props.params.id;

  return (
    <div className='px-20 py-15'>
      <ProductBreadcrumbs className='mb-15 ml-10' categoryId={+id} />
      <div className='grid grid-cols-4 space-x-10'>
        <ProductSidebar categoryId={+id} />
        <div className='col-span-3'>
          <ProductGrid categoryId={+id} />
        </div>
      </div>
    </div>
  );
};

export default Page;

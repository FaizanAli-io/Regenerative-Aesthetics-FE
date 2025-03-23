import PageBreadcrumbs from '@/app/components/PageBreadcrumb';
import React from 'react';

const data = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Shampoo & Conditioners',
    href: '#',
  },
  {
    name: 'Shampoo',
    href: '#',
  },
];

const ProductDetailsBreadcrumb = () => {
  return (
    <section className='px-24 py-10'>
      <PageBreadcrumbs items={data} currentItem='Nutrafol Shampoo' />
    </section>
  );
};

export default ProductDetailsBreadcrumb;

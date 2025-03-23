import React from 'react';
import ProductImages from '../_components/ProductImages';
import ProductInfo from '../_components/ProductInfo';

const ProductPrimaryInfo = () => {
  return (
    <section className='grid grid-cols-2 space-x-10 px-20 py-28'>
      <ProductImages />
      <ProductInfo />
    </section>
  );
};

export default ProductPrimaryInfo;

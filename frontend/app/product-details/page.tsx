import React from 'react';
import ProductPrimaryInfo from './_sections/ProductPrimaryInfo';
import RecommendedProducts from './_sections/RecommendedProducts';
import ReviewSummary from './_sections/ReviewSummary';
import RelatedProducts from './_sections/RelatedProducts';

const Page = () => {
  return (
    <>
      <ProductPrimaryInfo />
      <RecommendedProducts />
      <ReviewSummary />
      <RelatedProducts />
    </>
  );
};

export default Page;

import React from 'react';
import ProductPrimaryInfo from './_sections/ProductPrimaryInfo';
import RecommendedProducts from './_sections/RecommendedProducts';
import ReviewSummary from './_sections/ReviewSummary';

const Page = () => {
  return (
    <>
      <ProductPrimaryInfo />
      <RecommendedProducts />
      <ReviewSummary />
    </>
  );
};

export default Page;

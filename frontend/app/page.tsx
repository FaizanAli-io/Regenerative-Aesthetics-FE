import React from 'react';
import HomeCover from './Home/HomeCover';
import SectionIntro from './Home/SectionIntro';
import OurProducts from './Home/OurProducts';
import SpecialOffer from './Home/SpecialOffer';
import BlogHighlight from './Home/BlogHighlight';

const Page = () => {
  return (
    <>
      <HomeCover />
      <SectionIntro />
      <OurProducts />
      <SpecialOffer />
      <BlogHighlight />
    </>
  );
};

export default Page;

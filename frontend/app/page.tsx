import React from 'react';
import HomeCover from './Home/HomeCover';
import SectionIntro from './Home/SectionIntro';
import OurProducts from './Home/OurProducts';
import SpecialOffer from './Home/SpecialOffer';
import BlogHighlight from './Home/BlogHighlight';
import NaturallyCrafted from './Home/NaturallyCrafted';
import GetInTouch from './Home/GetInTouch';
import Reviews from './Home/Reviews';

const Page = () => {
  return (
    <>
      <HomeCover />
      <SectionIntro />
      <OurProducts />
      <SpecialOffer />
      <BlogHighlight />
      <NaturallyCrafted />
      <Reviews />
      <GetInTouch />
    </>
  );
};

export default Page;

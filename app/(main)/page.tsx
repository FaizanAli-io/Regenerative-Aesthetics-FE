import React from "react";
import HomeCover from "./Home/HomeCover";
import SectionIntro from "./Home/SectionIntro";
import OurProducts from "./Home/OurProducts";
import SpecialOffer from "./Home/SpecialOffer";
import ProductShowcase from "./Home/ProductShowcase";
// import BlogHighlight from "./Home/BlogHighlight";
import NaturallyCrafted from "./Home/NaturallyCrafted";
import Reviews from "./Home/Reviews";
import GetInTouch from "./Home/GetInTouch";

const Page = () => {
  return (
    <>
      <HomeCover />
      <SectionIntro />
      <OurProducts />
      <SpecialOffer />
      <ProductShowcase />
      {/* <BlogHighlight /> */}
      <NaturallyCrafted />
      <Reviews />
      <GetInTouch />
    </>
  );
};

export default Page;

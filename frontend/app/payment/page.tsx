import React from 'react';
import ShippingMethod from './_sections/ShippingMethod';
import SectionAddress from './_sections/SectionAddress';
import PaymentStepper from './_sections/PaymentStepper';
import SectionPay from './_sections/SectionPay';

const Page = () => {
  return (
    <>
      <PaymentStepper />
      <SectionAddress />
      <ShippingMethod />
      <SectionPay />
    </>
  );
};

export default Page;

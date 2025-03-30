import React from 'react';
import OrderSummary from './OrderSummary';
import CreditCardForm from './CreditCardForm';
import ShippingMethod from './_sections/ShippingMethod';

const Page = () => {
  return (
    <>
      <ShippingMethod />
      <OrderSummary />
      <CreditCardForm />
    </>
  );
};

export default Page;

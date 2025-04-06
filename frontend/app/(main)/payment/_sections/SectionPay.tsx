import React from 'react';
import OrderSummary from '../OrderSummary';
import CreditCardForm from '../CreditCardForm';

const SectionPay = () => {
  return (
    <section className='grid grid-cols-2 gap-x-10 px-20 py-28'>
      <OrderSummary />
      <div>
        <h2 className='text-3xl mb-5'>Payment</h2>

        <ul className='flex text-xl space-x-5 mb-10'>
          <li className='underline underline-offset-8'>Paypal</li>
          <li>Credit Card</li>
          <li>Easypaisa</li>
        </ul>

        <CreditCardForm />
      </div>
    </section>
  );
};

export default SectionPay;

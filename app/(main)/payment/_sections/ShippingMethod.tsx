import React from 'react';
import ShippingMethodItem from '../_components/ShippingMethodItem';

const data = [
  {
    charges: '$8.50',
    text: 'Cash on Delivery',
    date: '1 Oct, 2025',
  },
];

const ShippingMethod = () => {
  return (
    <section className='px-20 py-28'>
      <h2 className='text-2xl font-semibold mb-8'>Shpping Method</h2>
      <div className='space-y-4'>
        {data.map((item, index) => (
          <ShippingMethodItem
            charges={item.charges}
            text={item.text}
            date={item.date}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ShippingMethod;

import React from 'react';
import SummaryItem from './_components/SummaryItem';

const data = [
  {
    image: '/images/product/1.png',
    price: '$1399',
    text: 'Loreal serie expert metal DX Shampoo',
  },
  {
    image: '/images/product/2.png',
    price: '$549',
    text: 'Vitamino Color Protection Shampoo',
  },
  {
    image: '/images/product/3.png',
    price: '$399',
    text: 'Hairburst Shampoo for Dry Damaged Hair 350ml ',
  },
];

const OrderSummary = () => {
  return (
    <div className='border-1 border-gray-300 rounded-md p-15 space-y-5'>
      <h2 className='text-3xl'>Summary</h2>
      <div className=' space-y-2'>
        {data.map((item, i) => (
          <SummaryItem
            image={item.image}
            text={item.text}
            price={item.price}
            key={i}
          />
        ))}
      </div>

      <div className='text-black/70'>
        <p className=' text-lg'>Address</p>
        <p className='text-xl'>1131 Dusty Townline, Jacksonville, TX 40322</p>
      </div>

      <div className='text-black/70'>
        <p className=' text-lg'>Shipping method</p>
        <p className='text-xl'>EasyPaisa</p>
      </div>

      <div className='flex justify-between'>
        <p className='font-semibold text-xl'>Subtotal</p>
        <p className='font-semibold text-xl'>$2347</p>
      </div>

      <div className='flex justify-between'>
        <p className='text-black/70 text-lg'>Estimated Tax</p>
        <p className='font-semibold text-xl'>$50</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-black/70 text-lg'>Estimated shipping & Handling</p>
        <p className='font-semibold text-xl'>$50</p>
      </div>

      <div className='flex justify-between'>
        <p className='font-semibold text-xl'>Total</p>
        <p className='font-semibold text-xl'>$2426</p>
      </div>
    </div>
  );
};

export default OrderSummary;

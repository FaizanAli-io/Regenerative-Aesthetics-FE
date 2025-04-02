import React from 'react';
import CartItem from './_components/CartItem';
import OrderSummary from './OrderSummary';
import { Button } from '@/components/ui/button';

const data = [
  {
    image: '/images/product/5.png',
    title: 'Loreal serie expert metal DX Shampoo',
    code: '#25139526913984',
    price: '$1399',
    qty: 1,
  },
  {
    image: '/images/product/3.png',
    title: 'Vitamino Color Protection Shampoo',
    code: '#53459358345',
    price: '$1399',
    qty: 1,
  },
  {
    image: '/images/product/4.png',
    title: 'Hairburst Shampoo for Dry Damaged Hair 350ml ',
    code: '#63632324',
    price: '$1399',
    qty: 1,
  },
];

const Page = () => {
  return (
    <div className='grid grid-cols-2 gap-x-4 px-20 py-28'>
      <div>
        <h2 className='font-bold text-3xl'>Shopping Cart</h2>
        <div className='divide-y divide-gray-400 px-4'>
          {data.map(item => (
            <CartItem
              image={item.image}
              title={item.title}
              code={item.code}
              qty={item.qty}
              price={item.price}
              key={item.code}
            />
          ))}
        </div>
      </div>
      <div className=''>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Page;

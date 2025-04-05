'use client';
import React from 'react';
import CartItem from './_components/CartItem';
import OrderSummary from './OrderSummary';
import { useCart } from '@/lib/stores/cart';

const Page = () => {
  const items = useCart(state => state.cart.items);

  return (
    <div className='grid grid-cols-2 gap-x-4 px-20 py-28'>
      <div>
        <h2 className='font-bold text-3xl'>Shopping Cart</h2>
        {items.length <= 0 && (
          <p className='text-gray-500 font-semibold text-lg mt-2 w-full h-full flex items-center justify-center'>
            Your cart is empty
          </p>
        )}

        {items.length > 0 && (
          <div className='divide-y divide-gray-400 px-4'>
            {items.map(item => (
              <CartItem product={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
      <div className=''>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Page;

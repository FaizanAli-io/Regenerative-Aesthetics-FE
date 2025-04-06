'use client';

import React from 'react';
import SummaryItem from './_components/SummaryItem';
import { useCart } from '@/lib/stores/cart';

const OrderSummary = () => {
  const items = useCart(state => state.cart.items);
  const total = useCart(state => state.cart.totalPrice);

  return (
    <div className='border-1 border-gray-300 rounded-md p-15 space-y-5'>
      <h2 className='text-3xl'>Summary</h2>
      <div className=' space-y-2'>
        {items &&
          items.map(item => <SummaryItem key={item.id} product={item} />)}
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
        <p className='font-semibold text-xl'>${total}</p>
      </div>

      <div className='flex justify-between'>
        <p className='text-black/70 text-lg'>Estimated Tax</p>
        <p className='font-semibold text-xl'>${!total ? 0 : '50'}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-black/70 text-lg'>Estimated shipping & Handling</p>
        <p className='font-semibold text-xl'>${!total ? 0 : '50'}</p>
      </div>

      <div className='flex justify-between'>
        <p className='font-semibold text-xl'>Total</p>
        <p className='font-semibold text-xl'>${total ? total + 100 : 0}</p>
      </div>
    </div>
  );
};

export default OrderSummary;

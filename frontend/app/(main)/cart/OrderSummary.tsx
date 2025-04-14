'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/stores/cart';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
// import TextFieldLablel from '@/app/components/TextFieldLable';
// import TextField from '@/app/components/TextField';

const OrderSummary = () => {
  const total = useCart(state => state.cart.totalPrice);

  const handleCheckout = () => {
    if (total > 0) redirect('/payment');
    else toast.error('Your cart is empty!');
  };

  return (
    <div className='border-1 border-gray-300 rounded-md p-15 space-y-5'>
      <h2 className='font-bold text-3xl'>Order Summary</h2>
      {/* <div className='space-y-2'>
        <TextFieldLablel>Discount Code</TextFieldLablel>
        <TextField placeholder='Code' />
      </div> */}
      {/* <div className='space-y-2'>
        <TextFieldLablel>Your bonus card number</TextFieldLablel>
        <div className='flex items-center pr-3  cursor-pointer border rounded-md border-body'>
          <TextField
            placeholder='Enter Card Number'
            className='border-0 focus-visible:ring-[0px] flex-1'
          />

          <Button className=' text-primary-dark border-1 border-primary-dark hover:bg-white bg-white cursor-pointer'>
            Apply
          </Button>
        </div>
      </div> */}

      <div className='flex justify-between'>
        <p className='font-semibold text-xl'>Subtotal</p>
        <p className='font-semibold text-xl'>${total}</p>
      </div>

      <div className='flex justify-between'>
        <p className='text-black/70 text-lg'>Estimated Tax</p>
        <p className='font-semibold text-xl'>${total > 0 ? '50' : '0'}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-black/70 text-lg'>Estimated shipping & Handling</p>
        <p className='font-semibold text-xl'>${total > 0 ? '50' : '0'}</p>
      </div>

      <div className='flex justify-between'>
        <p className='font-semibold text-xl'>Total</p>
        <p className='font-semibold text-xl'>${total > 0 ? total + 100 : 0}</p>
      </div>

      <Button
        className='w-full text-xl py-6 mt-4 rounded-sm bg-primary-variant2 cursor-pointer'
        onClick={handleCheckout} // Attach handleCheckout to the button
      >
        Checkout
      </Button>
    </div>
  );
};

export default OrderSummary;

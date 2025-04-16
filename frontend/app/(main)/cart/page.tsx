'use client';
import React from 'react';
import CartItem from './_components/CartItem';
import OrderSummary from './OrderSummary';
import { useCart } from '@/lib/hooks/cart/use-cart';
import { ProtectedPage } from '@/app/components/ProtectedPage';

const Page = () => {
  const { data, isLoading } = useCart();

  const renderCartItems = () => {
    if (isLoading) {
      return (
        <p className='text-gray-500 font-semibold text-lg mt-2 w-full h-full flex items-center justify-center'>
          Loading cart items...
        </p>
      );
    }

    if (!data || !data.products.length) {
      return (
        <p className='text-gray-500 font-semibold text-lg mt-2 w-full h-full flex items-center justify-center'>
          Your cart is empty
        </p>
      );
    }

    const products = data.products.map(item => ({
      ...item.product,
      quantity: item.product_quantity,
    }));

    return (
      <div className='divide-y divide-gray-400 px-4'>
        {products.map(item => (
          <CartItem product={item} key={item.id} />
        ))}
      </div>
    );
  };

  return (
    <ProtectedPage>
      <div className='grid grid-cols-2 gap-x-4 px-20 py-28'>
        <div>
          <h2 className='font-bold text-3xl'>Shopping Cart</h2>
          {renderCartItems()}
        </div>
        <div className=''>
          <OrderSummary total={data?.totalAmount || 0} />
        </div>
      </div>
    </ProtectedPage>
  );
};

export default Page;

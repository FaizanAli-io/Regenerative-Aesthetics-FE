'use client';
import React from 'react';
import CartItem from './_components/CartItem';
import OrderSummary from './OrderSummary';
import { useCart } from '@/lib/hooks/cart/use-cart';
import { useCart as useCartStore } from '@/lib/stores/cart';
import { ProtectedPage } from '@/app/components/ProtectedPage';
import { useAuth } from '@/lib/hooks/use-auth';

const Page = () => {
  const { data, isLoading, isError } = useCart();
  const { items, totalPrice } = useCartStore(state => state.cart); // Ensure cache is initialized
  const { isAuthenticated } = useAuth();

  const renderCartItems = () => {
    if (isAuthenticated && isLoading) {
      return (
        <p className='text-gray-500 font-semibold text-lg mt-2 w-full h-full flex items-center justify-center'>
          Loading cart items...
        </p>
      );
    }

    if ((!data || !data.products.length) && !items.length) {
      return (
        <p className='text-gray-500 font-semibold text-lg mt-2 w-full h-full flex items-center justify-center'>
          Your cart is empty
        </p>
      );
    }

    const products = data
      ? data.products.map(item => ({
          ...item.product,
          quantity: item.product_quantity,
        }))
      : items;

    return (
      <div className='divide-y divide-gray-400 px-4'>
        {products &&
          products.map(item => <CartItem product={item} key={item.id} />)}
      </div>
    );
  };

  return (
    <div className='grid grid-cols-2 gap-x-4 px-20 py-28'>
      <div>
        <h2 className='font-bold text-3xl'>Shopping Cart</h2>
        {renderCartItems()}
      </div>
      <div className=''>
        <OrderSummary total={data ? data?.totalAmount : totalPrice} />
      </div>
    </div>
  );
};

export default Page;

'use client';
import React from 'react';
import { useOrders } from '@/lib/hooks/cart/use-orders';
import Order from './Order';
import OrderSkeleton from './OrderSkeleton';

const Page = () => {
  const { data: orders, isLoading, isFetched } = useOrders();

  return (
    <div>
      {isLoading && <OrderSkeleton />}
      {isFetched && !orders?.length && (
        <p className='text-center'>No orders.</p>
      )}
      {orders
        .filter(order => order.status !== 'cart')
        .sort((a: Order, b: Order) => {
          if (a.orderAt > b.orderAt) return -1;
          if (b.orderAt > a.orderAt) return 1;
          return 0;
        })
        .map(order => (
          <div key={order.id} className='mb-4'>
            <Order {...order} />
          </div>
        ))}
    </div>
  );
};

export default Page;

import type { Order, OrderedProduct } from '@/lib/services/checkout-service';
import { cn } from '@/lib/utils';
import React from 'react';

const Order = ({ status, products }: Order) => {
  const orderStatus = status[0].toUpperCase() + status.slice(1);

  const getProducts = (products: OrderedProduct[]) => {
    return products.map(product => (
      <div
        key={product.id}
        className='pb-2 last:pb-0 mb-2 grid grid-cols-3 place-items-center '
      >
        <div className='justify-self-start'>
          <h2>{product.product.title}</h2>
          <p>#{product.product.id}</p>
        </div>
        <div className='border-1 border-gray-300 text-gray-300 px-5 rounded-sm place-self-center'>
          Qty={product.product_quantity}
        </div>
        <div className='justify-self-end'>PKR {product.product.price}</div>
      </div>
    ));
  };

  return (
    <div>
      <div
        className={cn('flex justify-end text-white py-3 px-4 rounded-tr-3xl', {
          'bg-emerald-600': orderStatus === 'delivered',
          'bg-red-600': orderStatus === 'cancel',
          'bg-amber-400': orderStatus === 'Processing',
        })}
      >
        <h2 className='font-bold text-sm'>{orderStatus}</h2>
      </div>
      <div className='divide-y-1 space-y-2 divide-gray-300 px-5 pt-3'>
        {getProducts(products)}
      </div>
    </div>
  );
};

export default Order;

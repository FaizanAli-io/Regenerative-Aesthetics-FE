'use client';

import React, { useEffect, useState } from 'react';
import SummaryItem from './_components/SummaryItem';
import { useCart } from '@/lib/hooks/cart/use-cart';
import { useCart as useCartStore } from '@/lib/stores/cart';
import { getUser } from '@/lib/auth';

const OrderSummary = () => {
  const { data } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const products = data?.products || [];
  const totalAmount = data?.totalAmount || 0;
  const { totalPrice, items } = useCartStore(state => state.cart);

  useEffect(() => {
    if (getUser()) return setSubtotal(totalAmount);

    setSubtotal(totalPrice);
  }, [products, totalPrice]);

  return (
    <div className='border-1 border-gray-300 rounded-md p-15 space-y-5'>
      <h2 className='text-3xl'>Summary</h2>
      <div className=' space-y-2'>
        {products.length > 0 &&
          products.map(item => (
            <SummaryItem
              key={item.id}
              product={{
                id: item.product.id,
                title: item.product.title,
                price: item.product_unit_price.toString(),
                images: item.product.images,
                description: item.product.description,
                quantity: item.product_quantity,
                stock: item.product.stock,
              }}
            />
          ))}
      </div>

      <div className='text-black/70'>
        <p className=' text-lg font-semibold'>Address</p>
        {/* {address?.address && <p className='text-xl'>{address.address}</p>} */}
      </div>

      <div className='text-black/70'>
        <p className=' text-lg font-semibold'>Shipping method</p>
        <p className='text-xl'>Cash on Delivery</p>
      </div>

      <div className='flex justify-between'>
        <p className='font-semibold text-xl'>Subtotal</p>
        <p className='font-semibold text-xl'>${subtotal}</p>
      </div>

      <div className='flex justify-between'>
        <p className='text-black/70 text-lg'>Estimated Tax</p>
        <p className='font-semibold text-xl'>${!subtotal ? 0 : '50'}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-black/70 text-lg'>Estimated shipping & Handling</p>
        <p className='font-semibold text-xl'>${!subtotal ? 0 : '50'}</p>
      </div>

      <div className='flex justify-between'>
        <p className='font-semibold text-xl'>Total</p>
        <p className='font-semibold text-xl'>
          ${subtotal ? subtotal + 100 : 0}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;

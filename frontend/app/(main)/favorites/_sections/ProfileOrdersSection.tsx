'use client';
import OrderRow from '../_components/OrderRow';
import { useOrders } from '@/lib/hooks/cart/use-orders';
import React, { useEffect } from 'react';

const ProfileOrdersSection = () => {
  const { data: orders, isLoading, isFetched } = useOrders();

  const getAllProducts = () => {
    if (!orders?.length) return null;

    return orders
      .flatMap(order => order.products)
      .map(item => (
        <OrderRow
          title={item.product.title}
          unitPrice={parseFloat(item.product_unit_price)}
          quantity={item.product_quantity}
        />
      ));
  };

  useEffect(() => {
    getAllProducts();
  }, [orders]);

  return (
    <div className='p-4'>
      {isLoading ? (
        <p>Loading...</p>
      ) : isFetched && orders && orders.length ? (
        <div className='divide-y-1 divide-primary-darker'>
          {getAllProducts()}
        </div>
      ) : (
        <p>No Orders found.</p>
      )}
    </div>
  );
};

export default ProfileOrdersSection;

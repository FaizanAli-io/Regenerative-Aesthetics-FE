'use client';
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import OrderRow from '../_components/OrderRow';
import { useAllOrders } from '@/lib/hooks/cart/use-all-orders';

const OrdersSection: React.FC = () => {
  const { data: orders, isFetched, isLoading } = useAllOrders();

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const renderOrders = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={6} className='text-center py-2'>
            Loading...
          </td>
        </tr>
      );
    }

    if (!isFetched || !orders || !orders.length) {
      return (
        <tr>
          <td colSpan={6}>No orders found</td>
        </tr>
      );
    }

    return orders.map(order => (
      <OrderRow
        id={`#${order.id}`}
        date={new Date(order.orderAt!).toLocaleDateString() || 'Unknown Date'}
        customer={order.user.name || 'Unknown Customer'}
        paymentStatus={order.status as 'paid' | 'processing' | 'failed'}
        fulfillmentStatus={
          order.status === 'paid' ? 'fulfilled' : 'unfulfilled'
        }
        total={`$${order.totalAmount?.toFixed(2) || '0.00'}`}
      />
    ));
  };

  return (
    <Card>
      <CardContent className='p-0'>
        <Tabs defaultValue='all-orders' className='w-full'>
          <div className='border-b px-4'>
            <TabsList className='h-12 bg-transparent'>
              <TabsTrigger value='all-orders'>All Orders</TabsTrigger>
              <TabsTrigger value='open'>Open</TabsTrigger>
              <TabsTrigger value='unfulfilled'>Unfulfilled</TabsTrigger>
              <TabsTrigger value='unpaid'>Unpaid</TabsTrigger>
              <TabsTrigger value='from-canada'>From Canada</TabsTrigger>
              <TabsTrigger value='paid-orders'>Paid Orders</TabsTrigger>
              <TabsTrigger value='customers'>Customers</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='all-orders'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b'>
                    <th className='p-3 text-left'>Order</th>
                    <th className='p-3 text-left'>Date</th>
                    <th className='p-3 text-left'>Customer</th>
                    <th className='p-3 text-left'>Payment Status</th>
                    <th className='p-3 text-left'>Fulfillment Status</th>
                    <th className='p-3 text-left'>Total</th>
                  </tr>
                </thead>
                <tbody>{renderOrders()}</tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrdersSection;

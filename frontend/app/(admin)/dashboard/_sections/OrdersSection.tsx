'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import OrderRow from '../_components/OrderRow';
import { useAllOrders } from '@/lib/hooks/cart/use-all-orders';

const OrdersSection: React.FC = () => {
  const { data: orders, isFetched, isLoading } = useAllOrders();

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
        key={order.id}
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

  const renderFilteredOrders = (filterStatus: string) => {
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
          <td colSpan={6} className='text-center py-2'>
            No orders found
          </td>
        </tr>
      );
    }

    const filteredOrders = orders.filter(order => {
      if (filterStatus === 'failed') return order.status === 'failed';
      if (filterStatus === 'processing') return order.status === 'processing';
      if (filterStatus === 'fulfilled') return order.status === 'paid';
      if (filterStatus === 'unfulfilled') return order.status !== 'paid';
      return true; // for all-orders tab
    });

    if (filteredOrders.length === 0) {
      return (
        <tr>
          <td colSpan={6} className='text-center py-2'>
            No {filterStatus} orders found
          </td>
        </tr>
      );
    }

    return filteredOrders.map(order => (
      <OrderRow
        key={order.id}
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

  const getTabContent = (tab: string) => {
    return (
      <TabsContent value={tab}>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th className='p-3 text-left'>Date</th>
                <th className='p-3 text-left'>Customer</th>
                <th className='p-3 text-left'>Email</th>
                <th className='p-3 text-left'>Payment Status</th>
                <th className='p-3 text-left'>Fulfillment Status</th>
                <th className='p-3 text-left'>Total</th>
              </tr>
            </thead>
            <tbody>{renderFilteredOrders(tab)}</tbody>
          </table>
        </div>
      </TabsContent>
    );
  };

  return (
    <Card>
      <CardContent className='p-0'>
        <Tabs defaultValue='all-orders' className='w-full'>
          <div className='border-b px-4'>
            <TabsList className='h-12 bg-transparent'>
              <TabsTrigger value='all-orders'>All Orders</TabsTrigger>
              <TabsTrigger value='failed'>Failed</TabsTrigger>
              <TabsTrigger value='processing'>Processing</TabsTrigger>
              <TabsTrigger value='fulfilled'>fulfilled</TabsTrigger>
              <TabsTrigger value='unfulfilled'>Unfulfilled</TabsTrigger>
            </TabsList>
          </div>

          {getTabContent('all-orders')}
          {getTabContent('failed')}
          {getTabContent('processing')}
          {getTabContent('fulfilled')}
          {getTabContent('unfulfilled')}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrdersSection;

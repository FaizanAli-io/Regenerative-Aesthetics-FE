import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import OrderRow from './OrderRow';

const OrdersSection: React.FC = () => {
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
                <tbody>
                  <OrderRow
                    id='#1002901'
                    date='23/03/2023 09:45 AM'
                    customer='Theodore William Henry'
                    paymentStatus='paid'
                    fulfillmentStatus='unfulfilled'
                    total='$615.00'
                  />
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrdersSection;

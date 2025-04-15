import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface OrderRowProps {
  id: string;
  date: string;
  customer: string;
  paymentStatus: 'paid' | 'processing' | 'failed';
  fulfillmentStatus: 'fulfilled' | 'unfulfilled' | 'partially-fulfilled';
  total: string;
}

const OrderRow: React.FC<OrderRowProps> = ({
  id,
  date,
  customer,
  paymentStatus,
  fulfillmentStatus,
  total,
}) => {
  return (
    <tr className='border-b hover:bg-gray-50'>
      <td className='p-3'>
        <span className='text-sm font-medium text-green-600'>{id}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{date}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{customer}</span>
      </td>
      <td className='p-3'>
        <PaymentStatusBadge status={paymentStatus} />
      </td>
      <td className='p-3'>
        <FulfillmentStatusBadge status={fulfillmentStatus} />
      </td>
      <td className='p-3'>
        <span className='text-sm font-medium'>{total}</span>
      </td>
    </tr>
  );
};

const PaymentStatusBadge: React.FC<{
  status: 'paid' | 'processing' | 'failed';
}> = ({ status }) => {
  if (status === 'paid') {
    return <Badge className='bg-green-100 text-green-800'>Paid</Badge>;
  }
  if (status === 'processing') {
    return <Badge className='bg-yellow-100 text-yellow-800'>Processing</Badge>;
  }
  return <Badge className='bg-red-100 text-red-800'>Failed</Badge>;
};

const FulfillmentStatusBadge: React.FC<{
  status: 'fulfilled' | 'unfulfilled' | 'partially-fulfilled';
}> = ({ status }) => {
  if (status === 'fulfilled') {
    return <Badge className='bg-green-100 text-green-800'>Fulfilled</Badge>;
  }
  if (status === 'unfulfilled') {
    return <Badge className='bg-yellow-100 text-yellow-800'>Unfulfilled</Badge>;
  }
  return (
    <Badge className='bg-purple-100 text-purple-800'>Partially Fulfilled</Badge>
  );
};

export default OrderRow;

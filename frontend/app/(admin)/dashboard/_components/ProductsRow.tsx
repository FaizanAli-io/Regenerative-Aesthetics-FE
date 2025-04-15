import React from 'react';
import { Product } from '@/lib/services/products-service';

const ProductsRow: React.FC<{ product: Product }> = ({
  product: {
    id,
    title,
    price,
    stock,
    category: { title: category },
  },
}) => {
  return (
    <tr className='border-b hover:bg-gray-50'>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{id}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{title}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>
          {parseFloat(price).toFixed(2)}
        </span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{stock}</span>
      </td>
      <td className='p-3'>
        <span className='text-sm text-gray-600'>{category}</span>
      </td>
    </tr>
  );
};

export default ProductsRow;

'use client';
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useUsers } from '@/lib/hooks/use-all-users';
import UserRow from '../_components/UserRow';
import { useProducts } from '@/lib/hooks/use-products';
import ProductsRow from '../_components/ProductsRow';

const ProductsSection: React.FC = () => {
  const { data: products, isFetched, isLoading } = useProducts();

  useEffect(() => {
    console.log(products);
  }, [products]);

  const renderProducts = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={6} className='text-center py-2'>
            Loading...
          </td>
        </tr>
      );
    }

    if (!isFetched || !products || !products.length) {
      return (
        <tr>
          <td colSpan={6}>No orders found</td>
        </tr>
      );
    }

    return products.map(product => <ProductsRow product={product} />);
  };

  return (
    <Card>
      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th className='p-3 text-left'>ID</th>
                <th className='p-3 text-left'>Title</th>
                <th className='p-3 text-left'>Price</th>
                <th className='p-3 text-left'>Stock</th>
                <th className='p-3 text-left'>Category</th>
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsSection;

'use client';

import React, { useEffect, useState } from 'react';
import { useOrders } from '@/lib/hooks/cart/use-orders';
import { Product } from '@/lib/services/products-service';
import UnreviewedItem from './UnreviewdItem';
import UnreviewedSkeleton from './UnreviewedSkeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ReviewForm from './_forms/ReviewForm';
import { useReviewStore } from './_store/reviewStore';

const UnreviewedItemsTable = () => {
  const { data: orders, isLoading, isFetched } = useOrders();
  const [products, setProducts] = useState<Omit<Product, 'category'>[]>([]);

  const isDialogOpen = useReviewStore(store => store.dialogOpen);
  const setDialogOpen = useReviewStore(store => store.setDialogOpen);

  useEffect(() => {
    if (!orders || !orders.length) return;

    const finalProducts: Record<number, Omit<Product, 'category'>> = {};

    orders
      .flatMap(o => o.products)
      .map(p => p.product)
      .forEach(p => {
        finalProducts[p.id] = p;
      });

    setProducts(Object.values(finalProducts));
  }, [orders]);

  const getItems = () => {
    if (isLoading || !isFetched) return <UnreviewedSkeleton />;

    if (!products.length)
      return <p className='text-center my-5'>No items found.</p>;

    return (
      <>
        {products.map(p => (
          <div className='py-2 even:bg-gray-100 px-5' key={p.id}>
            <UnreviewedItem product={p} />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className='mb-20'>
      <Dialog open={isDialogOpen} onOpenChange={open => setDialogOpen(open)}>
        <div>
          <div className='divide-y divide-gray-100 border-1 border-gray-200 rounded-md'>
            {getItems()}
          </div>
        </div>
        <DialogContent className='sm:max-w-[425px] max-h-[85vh] overflow-hidden flex flex-col'>
          <DialogHeader className='flex-shrink-0'>
            <DialogTitle>Write Review</DialogTitle>
            <DialogDescription>Tell us about your experience</DialogDescription>
          </DialogHeader>
          <ReviewForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnreviewedItemsTable;

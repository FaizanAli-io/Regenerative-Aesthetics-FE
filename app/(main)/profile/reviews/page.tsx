'use client';

import React, { useState } from 'react';
import UnreviewedItemsTable from './_components/UnreviewedItemsTable';
import ReviewsHistory from './_components/ReviewHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

enum Values {
  history = 'history',
  toReview = 'toReview',
}

const Page = () => {
  const [active, setActive] = useState<string>(Values.toReview);

  const handleActive = (val: string) => setActive(val);

  return (
    <div>
      <Tabs defaultValue={Values.toReview} onValueChange={handleActive}>
        <TabsList className='bg-primary-dark '>
          <TabsTrigger
            value={Values.toReview}
            className={cn('cursor-pointer', {
              'text-white': active === Values.history,
            })}
          >
            To Be Reviewed
          </TabsTrigger>
          <TabsTrigger
            value={Values.history}
            className={cn('cursor-pointer', {
              'text-white': active === Values.toReview,
            })}
          >
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value={Values.toReview}>
          <UnreviewedItemsTable />
        </TabsContent>
        <TabsContent value={Values.history}>
          <ReviewsHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;

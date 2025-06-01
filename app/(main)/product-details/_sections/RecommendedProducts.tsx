import React from 'react';
import ProductMinimalCard from '../_components/ProductMinimalCard';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

const RecommendedProducts = () => {
  return (
    <section className='px-20 py-28'>
      <h2 className='text-primary-darker text-5xl font-bold text-center mb-3'>
        Complete the Regimen
      </h2>
      <p className='text-lg text-center text-body'>
        Discover product recommendations selected by Buyers
      </p>

      <div className='flex space-x-5 items-center h-full mt-15'>
        <ProductMinimalCard
          image='/images/product/1.png'
          text='Nutrafol Shampoo, Cleanse and Hydrate Hair and Scalp'
          price='44.00'
        />
        <div className='self-start h-[25rem] w-[1px] bg-black/40'></div>
        <ProductMinimalCard
          image='/images/product/5.png'
          text='Nutrafol Shampoo, Cleanse and Hydrate Hair and Scalp'
          price='44.00'
        />
        <PlusIcon size='60' />
        <ProductMinimalCard
          image='/images/product/6.png'
          text='Nutrafol Shampoo, Cleanse and Hydrate Hair and Scalp'
          price='44.00'
        />
        <div className='flex flex-col justify-center items-center space-y-2'>
          <p className='text-center text-3xl'>
            Price for all three:
            <span className='block'>$137.00</span>
          </p>
          <Button className='bg-primary-variant2 text-xl font-medium py-6 px-8'>
            Add to Card
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;

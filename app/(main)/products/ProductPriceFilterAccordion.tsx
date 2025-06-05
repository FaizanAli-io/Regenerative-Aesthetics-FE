'use client';

import React, { ChangeEvent } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useProductsStore } from '@/lib/stores/products-store';

const ProductPriceFilterAccordion = () => {
  const { min, max } = useProductsStore(state => state.priceFilter);
  const setPriceFilter = useProductsStore(state => state.setPriceFilter);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : 1;
    if (value < 1 || value > max) {
      return; // Prevent setting min below 1 or above current max
    }
    setPriceFilter(value, max);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : 50;
    if (value < min || value > 50) {
      return; // Prevent setting max below current min or above 50
    }
    setPriceFilter(min, value);
  };

  const handleRangeChange = ([min, max]: [number, number]) => {
    setPriceFilter(min, max);
  };

  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='price_filter'>
        <AccordionTrigger className='cursor-pointer text-[1rem] text-primary-darker'>
          Filter by Price
        </AccordionTrigger>
        <AccordionContent className='px-2'>
          <div className='flex justify-between space-x-4'>
            <div className='space-y-2'>
              <Label className='text-body text-sm' htmlFor='from'>
                From
              </Label>
              <Input
                id='from'
                placeholder='Min Price'
                type='number'
                value={min}
                onChange={handleMinChange}
              />
            </div>
            <div className='flex flex-col items-end space-y-2'>
              <Label className='text-body text-sm' htmlFor='to'>
                To
              </Label>
              <Input
                id='to'
                placeholder='Max Price'
                type='number'
                value={max}
                onChange={handleMaxChange}
              />
            </div>
          </div>
          <Slider
            className='mt-5'
            defaultValue={[1, 50]}
            min={1}
            max={50}
            step={1}
            value={[min, max]}
            onValueChange={handleRangeChange}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductPriceFilterAccordion;

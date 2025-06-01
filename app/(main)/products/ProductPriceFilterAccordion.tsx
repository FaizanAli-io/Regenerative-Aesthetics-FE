import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const ProductPriceFilterAccordion = () => {
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
              <Input id='from' placeholder='Min Price' type='number' />
            </div>
            <div className='flex flex-col items-end space-y-2'>
              <Label className='text-body text-sm' htmlFor='to'>
                To
              </Label>
              <Input id='to' placeholder='Min Price' type='number' />
            </div>
          </div>
          <Slider className='mt-5' defaultValue={[10, 33]} max={100} step={1} />

          {/* {items.map(item => (
            <div className='flex items-center space-x-2'>
              <Checkbox
                id={item.label.replace(' ', '_')}
                className='cursor-pointer'
              />
              <label
                htmlFor={item.label.replace(' ', '_')}
                className='text-primary-darker text-sm font-medium leading-none cursor-pointer'
              >
                {item.label}
                <span className='text-xs text-neutral-400 font-normal ml-1'>
                  {item.count}
                </span>
              </label>
            </div>
          ))} */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductPriceFilterAccordion;

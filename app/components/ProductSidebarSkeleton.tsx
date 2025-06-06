import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Props {
  accordionCount?: number;
  itemsPerAccordion?: number;
}

const ProductSidebarSkeleton = ({ 
  accordionCount = 3, 
  itemsPerAccordion = 4 
}: Props) => {
  return (
    <>
      {/* Category Accordions Skeleton */}
      {Array.from({ length: accordionCount }).map((_, accordionIndex) => (
        <Accordion key={accordionIndex} type='single' collapsible className='w-full'>
          <AccordionItem value={`skeleton-${accordionIndex}`}>
            <AccordionTrigger className='text-[1rem] text-primary-darker'>
              <Skeleton className='h-5 w-24' />
            </AccordionTrigger>
            <AccordionContent className='space-y-4 px-2'>
              {/* Search field skeleton */}
              <div className='pt-2'>
                <Skeleton className='h-10 w-full rounded-md' />
              </div>
              
              {/* Category items skeleton */}
              {Array.from({ length: itemsPerAccordion }).map((_, itemIndex) => (
                <div className='flex items-center space-x-2' key={itemIndex}>
                  <Skeleton className='h-4 w-4 rounded' />
                  <Skeleton className='h-4 w-20' />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default ProductSidebarSkeleton;

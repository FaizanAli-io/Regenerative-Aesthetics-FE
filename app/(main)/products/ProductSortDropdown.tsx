'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ProductSort, useProductsStore } from '@/lib/stores/products-store';

const sortLabels = [
  {
    value: ProductSort.rating,
    label: 'By Rating',
  },
  {
    value: ProductSort.popularity,
    label: 'By Popularity',
  },
  {
    value: ProductSort.price,
    label: 'By Price',
  },
  {
    value: ProductSort.date,
    label: 'By Date',
  },
];

function ProductSortDropdown() {
  const [open, setOpen] = React.useState(false);
  const sortBy = useProductsStore(state => state.sortBy);
  const setSortBy = useProductsStore(state => state.setSortBy);

  const handleSelect = (currentValue: string) => {
    setSortBy?.(currentValue as ProductSort);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {sortBy
            ? sortLabels.find(label => label.value === sortBy)?.label
            : 'Sort By'}
          <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search framework...' />
          <CommandList>
            <CommandEmpty>Not Found.</CommandEmpty>
            <CommandGroup>
              {sortLabels.map(label => (
                <CommandItem
                  key={label.value}
                  value={label.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      sortBy === label.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {label.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ProductSortDropdown;

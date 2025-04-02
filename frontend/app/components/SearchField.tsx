import React, { HTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchField = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('  grid w-full items-center gap-1.5', className)}
      {...props}
    >
      <div className='relative'>
        <div className='absolute left-2.75 top-2.75 h-5 w-5 text-muted-foreground'>
          <SearchIcon className='h-5 w-5 text-primary-darker' />
        </div>
        <Input
          placeholder='Search'
          className='w-full rounded-lg border-primary-darker pl-10 py-5 '
        />
      </div>
    </div>
  );
};

export default SearchField;

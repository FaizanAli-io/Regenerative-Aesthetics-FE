import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, { HTMLAttributes } from 'react';
import ButtonOutline from './ButtonOutline';
import Image from 'next/image';
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string;
  price: string;
  theme?: 'light' | 'dark' | 'primary';
}

const ProductCard = ({
  image,
  price,
  children,
  className,
  theme,
  ...props
}: Props) => {
  console.log(theme);

  return (
    <Card
      className={cn(
        {
          'bg-primary ': theme === 'primary' || !theme,
          'bg-dark': theme === 'dark',
          'bg-[#f6f6f6] border-0': theme === 'light',
        },
        'px-4',
        className
      )}
      {...props}
    >
      <CardContent className='px-2 flex flex-col items-center  h-full'>
        <div className='flex justify-end w-full'>
          <span
            className={cn(
              {
                'text-dark/70': theme === 'primary' || !theme,
                'text-body/70': theme === 'dark',
                'text-body/50': theme === 'light',
              },
              'cursor-pointer'
            )}
          >
            <HeartIcon size='25' className='translate-x-2' />
          </span>
        </div>
        <Image
          src={image}
          alt='Special Offer'
          width={250}
          height={250}
          className='object-contain w-full h-full'
        />

        <CardTitle
          className={cn(
            {
              'text-white': theme === 'primary' || 'dark' || !theme,
              'text-primary-darker': theme === 'light',
            },
            ' text-center text-lg'
          )}
        >
          {children}
        </CardTitle>
        <p
          className={cn(
            {
              'text-dark': theme === 'primary' || !theme,
              'text-primary': theme === 'dark',
              'text-primary-darker': theme === 'light',
            },
            'text-2xl my-3 font-semibold'
          )}
        >
          {price}
        </p>

        <Button
          className={cn(
            {
              'bg-dark text-white ': theme === 'primary' || !theme,
              'bg-white text-primary': theme === 'dark',
              'bg-primary-variant2 text-white': theme === 'light',
            },
            'px-10 py-5 cursor-pointer w-full'
          )}
        >
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

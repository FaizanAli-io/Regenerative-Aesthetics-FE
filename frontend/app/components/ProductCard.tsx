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
          'bg-gray-100': theme === 'light',
        },
        'px-5',
        className
      )}
      {...props}
    >
      <CardHeader className='flex justify-end'>
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
          <HeartIcon size='30' className='translate-x-5' />
        </span>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <Image
          src={image}
          alt='Special Offer'
          width={300}
          height={300}
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
            'text-2xl mt-4 font-semibold'
          )}
        >
          {price}
        </p>
      </CardContent>
      <CardFooter className='flex justify-center items-center'>
        <ButtonOutline
          className={cn(
            {
              'text-white bg-dark':
                theme === 'primary' || !theme || theme === 'light',
              'bg-white text-primary': theme === 'dark',
            },
            'py-6 font-semibold'
          )}
        >
          Buy Now
        </ButtonOutline>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

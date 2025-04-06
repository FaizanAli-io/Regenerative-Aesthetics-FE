'use client';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/services/products-service';
import { useCart } from '@/lib/stores/cart';
import { toast } from 'sonner';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isFavourite?: boolean;
  product: Product;
  theme?: 'light' | 'dark' | 'primary';
}

const ProductCard = ({
  product,
  children,
  className,
  theme,
  isFavourite = false,
  ...props
}: Props) => {
  const addToCart = useCart(state => state.addToCart);
  const items = useCart(state => state.cart.items);

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (items.length && items.find(i => i.id === product.id)) setIsAdded(true);
  });

  const handleClick = () => {
    if (items.length && items.find(i => i.id === product.id)) return;

    setIsAdded(true);
    addToCart({
      ...product,
      quantity: 1,
    });

    toast.success('Added to cart');
  };

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
            <HeartIcon
              size='25'
              className='translate-x-2'
              fill={isFavourite ? '#fa6784' : 'none'}
              stroke={isFavourite ? '#fa6784' : '#999'}
            />
          </span>
        </div>
        <Image
          // !temp
          src='/images/home/shampoo.png'
          alt={product.title}
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
          {product.price}
        </p>

        <Button
          disabled={isAdded}
          onClick={handleClick}
          className={cn(
            {
              'bg-dark text-white ': theme === 'primary' || !theme,
              'bg-white text-primary': theme === 'dark',
              'bg-primary-variant2 text-white': theme === 'light',
            },
            'px-10 py-5 cursor-pointer w-full'
          )}
        >
          {isAdded ? 'Added' : 'Buy Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

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
import { getUser } from '@/lib/auth';
import { useAuth } from '@/lib/hooks/use-auth';
import { User } from '@/lib/services/auth-service';
import { useAddWishlist } from '@/lib/hooks/wishlist/use-add-wishlist';
import { useWishlist } from '@/lib/hooks/wishlist/use-wishlist';

interface Props extends HTMLAttributes<HTMLDivElement> {
  product: Omit<Product, 'category'>; // Removed 'category' from Product type
  theme?: 'light' | 'dark' | 'primary';
  favorite?: boolean;
}

const ProductCard = ({
  product,
  children,
  className,
  favorite,
  theme,
  ...props
}: Props) => {
  const { mutate: addToWishlist } = useAddWishlist();
  const { data: wishlist } = useWishlist();

  const addToCart = useCart(state => state.addToCart);
  const items = useCart(state => state.cart.items);

  const [user, setUser] = useState<User | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (items.length && items.find(i => i.id === product.id)) setIsAdded(true);

    const _user = getUser();
    setUser(_user);
  }, []);

  useEffect(() => {
    if (favorite || !wishlist || !wishlist.wishlistItems.length) return;

    const isProductInWishlist = wishlist.wishlistItems.find(
      item => item.product.id === product.id
    );

    if (isProductInWishlist) setIsFavourite(true);
  }, [wishlist, favorite]);

  const handleClick = () => {
    if (items.length && items.find(i => i.id === product.id)) return;

    setIsAdded(true);
    addToCart({
      ...product,
      quantity: 1,
    });

    toast.success('Added to cart');
  };

  const handleFavorite = () => {
    if (isFavourite || !user) return;

    addToWishlist(
      {
        productId: product.id,
        userId: user.id,
      },
      {
        onSuccess: () => {
          toast.success('Added to wishlist');
        },
        onError: () => {
          toast.error('Failed to add to wishlist');
        },
      }
    );
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
              fill={isFavourite || favorite ? '#fa6784' : 'none'}
              stroke={isFavourite || favorite ? '#fa6784' : '#999'}
              onClick={handleFavorite}
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

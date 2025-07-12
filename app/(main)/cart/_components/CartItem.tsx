import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDeleteCart } from '@/lib/hooks/cart/use-delete-cart';
import { useAuth } from '@/lib/hooks/use-auth';
import { CartItem as ICartItem, useCart } from '@/lib/stores/cart';
import clsx from 'clsx';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';
import { toast } from 'sonner';

interface Props extends HTMLAttributes<HTMLDivElement> {
  product: ICartItem;
}

const CartItem = ({ product, className, ...props }: Props) => {
  const { mutate: deleteItem } = useDeleteCart();
  const { isAuthenticated } = useAuth();
  const remoteItem = useCart(state => state.removeFromCart);
  const incrementItem = useCart(state => state.incrementQuantity);
  const decrementItem = useCart(state => state.decrementQuantity);

  const handleRemove = () => {
    if (!isAuthenticated) {
      remoteItem(product.id);
      toast.success('Product removed from cart!');
      return;
    }

    deleteItem(product.id, {
      onSuccess: () => {
        toast.success('Product removed!');
      },
      onError: error => {
        console.error(error);
        toast.error('Failed to remove product!');
      },
    });
  };

  const handleIncrement = () => {
    if (!isAuthenticated) return incrementItem(product.id);

    toast.info('You can only buy one product at a time!');
  };

  const handleDecrement = () => {
    if (!isAuthenticated) return decrementItem(product.id);
  };

  return (
    <div
      className={clsx(
        'grid grid-cols-5 items-center space-x-5 py-10',
        className
      )}
      {...props}
    >
      <div className='flex space-x-2 items-center col-span-3'>
        <Image
          src='/images/home/shampoo.png'
          alt={product.title}
          className='max-w-20 h-auto object-contain'
          width={150}
          height={150}
          objectFit='contain'
        />
        <div>
          <h2 className='text-lg font-semibold'>{product.title}</h2>
        </div>
      </div>
      <div className='flex space-x-2'>
        <Button
          onClick={handleDecrement}
          className='bg-white text-primary-darker text-2xl pt-1 cursor-pointer hover:bg-white'
        >
          -
        </Button>
        <input
          className='w-5 border-1 rounded-sm border-gray-300 font-semibold text-center text-primary-darker '
          value={product.quantity}
        />
        <Button
          onClick={handleIncrement}
          className='bg-white text-primary-darker text-2xl pt-1 cursor-pointer hover:bg-white'
        >
          +
        </Button>
      </div>
      <div className='flex space-x-5 items-center'>
        <p className='text-2xl text-primary-darker'>
          {(parseFloat(product.price) * product.quantity).toFixed(2)}
        </p>
        <XIcon
          onClick={handleRemove}
          size={25}
          className='cursor-pointer text-gray-500'
          strokeWidth={1}
        />
      </div>
    </div>
  );
};

export default CartItem;

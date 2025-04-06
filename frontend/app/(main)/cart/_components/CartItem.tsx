import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/lib/services/products-service';
import { CartItem as ICartItem, useCart } from '@/lib/stores/cart';
import clsx from 'clsx';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  product: ICartItem;
}

const CartItem = ({ product, className, ...props }: Props) => {
  const removeItem = useCart(state => state.removeFromCart);
  const increment = useCart(state => state.incrementQuantity);
  const decrement = useCart(state => state.decrementQuantity);

  const handleRemove = () => removeItem(product.id);
  const handleIncrement = () => increment(product.id);
  const handleDecrement = () => decrement(product.id);

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
          {/* <p className='text-gray-600'>{code}</p> */}
        </div>
      </div>
      <div className='flex'>
        <Button
          onClick={handleDecrement}
          className='bg-white text-primary-darker text-2xl pt-1 cursor-pointer hover:bg-white'
        >
          -
        </Button>
        <Input
          className='border-1 w-10 px-3 py-1 rounded-sm border-gray-300 font-semibold text-center text-primary-darker'
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
          {/* make sure that the precision is no more than 2 */}
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

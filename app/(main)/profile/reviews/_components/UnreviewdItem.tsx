import { Button } from '@/components/ui/button';
import { Product } from '@/lib/services/products-service';
import React from 'react';
import { useReviewStore } from './_store/reviewStore';
import { motion } from 'motion/react';

const MButton = motion(Button);

interface Props {
  product: Omit<Product, 'category'>;
}

const UnreviewedItem = ({ product }: Props) => {
  const setProductId = useReviewStore(s => s.setProductId);
  const setDialogOpen = useReviewStore(s => s.setDialogOpen);

  const handleClick = () => {
    setProductId(product.id);
    setDialogOpen(true);
  };

  return (
    <div className='flex justify-between items-center'>
      <div>
        <h2>{product.title}</h2>
        <p className='text-primary-variant2'>#{product.id}</p>
      </div>

      <MButton
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        className='cursor-pointer border-primary text-primary hover:text-primary'
        variant='outline'
        onClick={handleClick}
      >
        Review
      </MButton>
    </div>
  );
};

export default UnreviewedItem;

import { Button } from '@/components/ui/button';
import React from 'react';
import ProductFeatureCard from './ProductFeatureCard';
import ButtonOutline from '@/app/components/ButtonOutline';
import { ShieldCheckIcon, StoreIcon, TruckIcon } from 'lucide-react';
import ProductExtras from './ProductExtras';

const buttons = ['250ml', '500ml', '1L', '2L'];
const features = [
  { textNeutral: 'Suitable for', text: 'All hair types' },
  { textNeutral: 'Scent', text: 'All hair types' },
  { textNeutral: 'Suitable for', text: 'All hair types' },
  { textNeutral: 'Age Range', text: 'Adults Only' },
  { textNeutral: 'Key Ingredients', text: 'Aloe Vera, Argan Oil, Keratin' },
];

const ProductInfo = () => {
  return (
    <div className='space-y-5'>
      <h1 className='text-5xl text-primary-darker font-semibold'>
        Nutrafol Shampoo
      </h1>
      <p className='text-4xl text-primary-darker font-semibold'>
        $40
        <span className='ml-2 text-body text-3xl line-through font-normal'>
          $45
        </span>
      </p>

      <div className='flex space-x-4'>
        {buttons.map((button, index) => (
          <Button
            variant='outline'
            className='border-2 text-xl text-primary-darker font-normal px-9 py-6 min-w-[115px]'
            key={index}
          >
            {button}
          </Button>
        ))}
      </div>
      <div className='flex space-x-5'>
        {features.slice(0, 3).map((feature, index) => (
          <ProductFeatureCard key={index} {...feature} />
        ))}
      </div>
      <div className='flex space-x-5'>
        {features.slice(3).map((feature, index) => (
          <ProductFeatureCard key={index} {...feature} />
        ))}
      </div>
      <p className='text-md text-black/60'>
        Experience enhanced hydration , designed to nourish and revitalize your
        hair. Thanks to its natural formula, it provides all-day moisture
        without weighing your hair down. Achieve salon-quality results with a
        powerful blend of botanical extracts, making your hair shine in any
        light, whether indoors or outdoors.
      </p>
      <div className='flex space-x-5'>
        <ButtonOutline className='text-xl text-white bg-primary-variant2'>
          Buy Now
        </ButtonOutline>
        <ButtonOutline className='border-2 text-primary-variant2 border-primary-variant2 text-xl'>
          Add to Cart
        </ButtonOutline>
      </div>

      <div className='flex space-x-25'>
        <ProductExtras
          text1='Free Delivery'
          text2='1-2 Day'
          icon={<TruckIcon strokeWidth={1.5} />}
        />
        <ProductExtras
          text1='In Stoc'
          text2='Today'
          icon={<StoreIcon strokeWidth={1.5} />}
        />
        <ProductExtras
          text1='Guaranteed'
          text2='1 year'
          icon={<ShieldCheckIcon strokeWidth={1.5} />}
        />
      </div>
    </div>
  );
};

export default ProductInfo;

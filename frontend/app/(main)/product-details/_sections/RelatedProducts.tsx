import ProductCard from '@/app/components/ProductCard';
import React from 'react';

const data = [
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Living Proof <br />
        Frizz Free Shampoo
      </p>
    ),
    price: '$900',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        GOPURE
        <br />
        Eye Cream
      </p>
    ),
    price: '$2535',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
  {
    image: '/images/home/shampoo.png',
    children: (
      <p>
        Salt & Stone
        <br />
        Sunscreen Lotion
      </p>
    ),
    price: '$399',
  },
];

const RelatedProducts = () => {
  return (
    <section className='px-20 py-28'>
      <h2 className='text-4xl font-medium mb-15'>Related Products</h2>
      {/* <div className='flex  space-x-5 w-full'>
        {data.map((product, index) => (
          <ProductCard
            className='w-full'
            key={index}
            product={{
              ...product

            }}
          >
            {product.children}
          </ProductCard>
        ))}
      </div> */}
    </section>
  );
};

export default RelatedProducts;

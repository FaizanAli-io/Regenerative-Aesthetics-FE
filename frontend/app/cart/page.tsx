import React from 'react';
import CartItem from './_components/CartItem';

const data = [
  {
    image: '/images/product/5.png',
    title: 'Loreal serie expert metal DX Shampoo',
    code: '#25139526913984',
    price: '$1399',
    qty: 1,
  },
  {
    image: '/images/product/3.png',
    title: 'Vitamino Color Protection Shampoo',
    code: '#53459358345',
    price: '$1399',
    qty: 1,
  },
  {
    image: '/images/product/4.png',
    title: 'Hairburst Shampoo for Dry Damaged Hair 350ml ',
    code: '#63632324',
    price: '$1399',
    qty: 1,
  },
];

const Page = () => {
  return (
    <div className='divide-y divide-gray-400'>
      {data.map(item => (
        <CartItem
          image={item.image}
          title={item.title}
          code={item.code}
          qty={item.qty}
          price={item.price}
          key={item.code}
        />
      ))}
    </div>
  );
};

export default Page;

import { CartItem } from '@/lib/stores/cart';

const addToCartCache = (item: CartItem) => {
  const raw = localStorage.getItem('cart');
  let cart: CartItem[] = [];

  if (raw) cart = JSON.parse(raw);

  cart.push(item);

  localStorage.setItem('cart', JSON.stringify(cart));
};

export { addToCartCache };

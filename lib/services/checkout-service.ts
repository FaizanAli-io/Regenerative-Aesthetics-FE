import create from './http-service';
import { Product } from './products-service';

interface Address {
  id: string;
  phone: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

interface OrderedProduct {
  id: number;
  product_unit_price: string;
  product_quantity: number;
  product: Omit<Product, 'category'>;
}

interface Order {
  id: number;
  orderAt: string; // ISO date string
  status: string;
  shippedAt: string | null;
  deliveredAt: string | null;
  shippingAddress: Address;
  products: OrderedProduct[];
}

export default create('/orders/cart/checkout');

export type { Address, Order, OrderedProduct };

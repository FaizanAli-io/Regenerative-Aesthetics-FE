import { useQuery } from '@tanstack/react-query';
import { CART_KEY } from '@/lib/hooks/_cache-keys';
import { Product } from '@/lib/services/products-service';
import cart from '@/lib/services/orders-service';

interface ResProduct extends Omit<Product, 'category'> {
  createdAt: string;
  updatedAt: string;
}

interface CartRes {
  id: number;
  orderAt: string;
  status: string;
  shippedAt: null | string;
  deliveredAt: null | string;
  totalAmount: number;
  products: {
    id: number;
    product_quantity: number;
    product_unit_price: number;
    product: ResProduct;
  }[];
}

const useCart = () =>
  useQuery({
    queryKey: CART_KEY,
    queryFn: () =>
      cart.getOdd<CartRes>('/cart/mine').request.then(res => res.data),
  });

export { useCart };
export type { CartRes };

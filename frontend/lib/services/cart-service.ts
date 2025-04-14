import create from './http-service';

interface CartAddReq {
  id: number;
  product_quantity: number;
}

export default create('/orders/cart');
export type { CartAddReq };

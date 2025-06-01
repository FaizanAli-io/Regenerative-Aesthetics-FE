import create from './http-service';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  images: string[];
  category: {
    id: number;
    title: string;
    description: string;
  };
}

export interface DBProduct {
  totalProducts: number;
  limit: number;
  products: Product[];
}

export default create('/products');

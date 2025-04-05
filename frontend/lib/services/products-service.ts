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

export default create('/categories');

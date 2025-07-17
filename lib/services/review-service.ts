import { User } from './auth-service';
import create from './http-service';
import { Product } from './products-service';

export interface ReviewReq {
  productId: number;
  comment: string;
  ratings: number;
}

export interface Review {
  id: number;
  ratings: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  product: Product;
}

export default create('/reviews');

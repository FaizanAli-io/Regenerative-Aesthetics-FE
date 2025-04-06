import create from './http-service';

export interface WLProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: number;
  createdAt: string;
  product: WLProduct;
}

export interface WishlistItemRequest {
  productId: number;
  userId: number;
}

export interface WishlistResponse {
  wishlistItems: WishlistItem[];
  totalItems: number;
  limit: number;
}

export default create('/wishlists');

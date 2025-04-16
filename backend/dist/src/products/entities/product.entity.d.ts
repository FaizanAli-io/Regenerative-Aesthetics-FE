import { CategoryEntity } from './../../categories/entities/category.entity';
import { OrdersProductsEntity } from './../../orders/entities/orders-products.entity';
import { ReviewEntity } from './../../reviews/entities/review.entity';
import { UserEntity } from './../../users/entities/user.entity';
import { WishlistItemEntity } from './../../wishlists/entities/wishlists-items.entity';
import { Timestamp } from 'typeorm';
export declare class ProductEntity {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    addedBy: UserEntity;
    category: CategoryEntity | null;
    reviews: ReviewEntity[];
    products: OrdersProductsEntity[];
    wishlistedBy: WishlistItemEntity[];
}

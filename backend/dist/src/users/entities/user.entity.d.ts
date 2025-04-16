import { CategoryEntity } from './../../categories/entities/category.entity';
import { OrderEntity } from './../../orders/entities/order.entity';
import { ProductEntity } from './../../products/entities/product.entity';
import { ReviewEntity } from './../../reviews/entities/review.entity';
import { Roles } from './../../utility/common/user-roles.enum';
import { WishlistItemEntity } from './../../wishlists/entities/wishlists-items.entity';
import { Timestamp } from 'typeorm';
import { AddressBookEntity } from './address-book.entity';
export declare class UserEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: Roles[];
    isVerified: boolean;
    verificationToken: string;
    verificationTokenExpires: Date;
    resetPasswordToken: string;
    resetPasswordTokenExpires: Date;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    categories: CategoryEntity[];
    products: ProductEntity[];
    reviews: ReviewEntity[];
    ordersUpdateBy: OrderEntity[];
    orders: OrderEntity[];
    wishlistItems: WishlistItemEntity[];
    contactDetails: AddressBookEntity[];
}

import { ProductEntity } from './../../products/entities/product.entity';
import { UserEntity } from './../../users/entities/user.entity';
export declare class WishlistItemEntity {
    id: number;
    createdAt: Date;
    user: UserEntity;
    product: ProductEntity;
}

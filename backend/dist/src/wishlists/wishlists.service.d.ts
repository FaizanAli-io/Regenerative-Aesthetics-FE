import { DeleteResult, Repository } from 'typeorm';
import { ProductEntity } from './../products/entities/product.entity';
import { WishlistItemEntity } from './entities/wishlists-items.entity';
export declare class WishlistsService {
    private readonly wishlistRepository;
    private readonly productRepository;
    constructor(wishlistRepository: Repository<WishlistItemEntity>, productRepository: Repository<ProductEntity>);
    addToWishlist(userId: number, productId: number): Promise<WishlistItemEntity>;
    getUserWishlist(userId: number, query: any): Promise<{
        wishlistItems: any[];
        totalItems: number;
        limit: number;
    }>;
    removeFromWishlist(userId: number, productId: number): Promise<DeleteResult>;
    checkIfWishlisted(userId: number, productId: number): Promise<boolean>;
}

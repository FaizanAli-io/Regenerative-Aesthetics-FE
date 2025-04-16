import { WishlistsService } from './wishlists.service';
import { UserEntity } from './../users/entities/user.entity';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    addToWishlist(currentUser: UserEntity, productId: number): Promise<import("./entities/wishlists-items.entity").WishlistItemEntity>;
    getUserWishlist(currentUser: UserEntity, query: any): Promise<{
        wishlistItems: any[];
        totalItems: number;
        limit: number;
    }>;
    removeFromWishlist(currentUser: UserEntity, productId: number): Promise<import("typeorm").DeleteResult>;
    checkIfWishlisted(currentUser: UserEntity, productId: number): Promise<boolean>;
}

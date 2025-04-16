"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./../products/entities/product.entity");
const wishlists_items_entity_1 = require("./entities/wishlists-items.entity");
let WishlistsService = class WishlistsService {
    wishlistRepository;
    productRepository;
    constructor(wishlistRepository, productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
    }
    async addToWishlist(userId, productId) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const existing = await this.wishlistRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
        });
        if (existing)
            throw new common_1.ConflictException('Product already in wishlist');
        const wishlistItem = this.wishlistRepository.create({
            user: { id: userId },
            product: { id: productId },
        });
        return await this.wishlistRepository.save(wishlistItem);
    }
    async getUserWishlist(userId, query) {
        const limit = query.limit || 10;
        const queryBuilder = this.wishlistRepository
            .createQueryBuilder('wishlistItem')
            .leftJoinAndSelect('wishlistItem.product', 'product')
            .where('wishlistItem.userId = :userId', {
            userId,
        })
            .orderBy('wishlistItem.createdAt', 'DESC');
        const totalItems = await queryBuilder.getCount();
        if (query.search) {
            queryBuilder.andWhere('product.title ILIKE :search', {
                search: `%${query.search}%`,
            });
        }
        if (query.category) {
            queryBuilder.andWhere('product.categoryId = :categoryId', {
                categoryId: query.category,
            });
        }
        queryBuilder.take(limit);
        if (query.offset)
            queryBuilder.skip(query.offset);
        const wishlistItems = await queryBuilder.getMany();
        return {
            wishlistItems: wishlistItems.map((item) => ({
                ...item,
                product: item.product,
            })),
            totalItems,
            limit,
        };
    }
    async removeFromWishlist(userId, productId) {
        const result = await this.wishlistRepository.delete({
            user: { id: userId },
            product: { id: productId },
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Wishlist item not found');
        }
        return result;
    }
    async checkIfWishlisted(userId, productId) {
        const exists = await this.wishlistRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
        });
        return !!exists;
    }
};
exports.WishlistsService = WishlistsService;
exports.WishlistsService = WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlists_items_entity_1.WishlistItemEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WishlistsService);
//# sourceMappingURL=wishlists.service.js.map
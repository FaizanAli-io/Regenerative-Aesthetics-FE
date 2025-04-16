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
exports.WishlistsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const wishlists_service_1 = require("./wishlists.service");
const user_entity_1 = require("./../users/entities/user.entity");
const authentication_guard_1 = require("./../utility/common/guards/authentication.guard");
const current_user_decorator_1 = require("./../utility/common/decorators/current-user.decorator");
let WishlistsController = class WishlistsController {
    wishlistsService;
    constructor(wishlistsService) {
        this.wishlistsService = wishlistsService;
    }
    async addToWishlist(currentUser, productId) {
        return await this.wishlistsService.addToWishlist(currentUser.id, productId);
    }
    async getUserWishlist(currentUser, query) {
        return await this.wishlistsService.getUserWishlist(currentUser.id, query);
    }
    async removeFromWishlist(currentUser, productId) {
        return await this.wishlistsService.removeFromWishlist(currentUser.id, productId);
    }
    async checkIfWishlisted(currentUser, productId) {
        return await this.wishlistsService.checkIfWishlisted(currentUser.id, productId);
    }
};
exports.WishlistsController = WishlistsController;
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)('add'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Add a product to the wishlist',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The product has been successfully added to the wishlist.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Product already in the wishlist.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "addToWishlist", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: "Get all products in the user's wishlist",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Returns a list of products in the user's wishlist.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No products found in the wishlist.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Object]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "getUserWishlist", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Delete)('remove/:productId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove a product from the wishlist',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The product has been successfully removed from the wishlist.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product not found in the wishlist.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "removeFromWishlist", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Get)('check/:productId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Check if a product is in the wishlist',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns whether the product is in the wishlist.',
        type: Boolean,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product not found.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "checkIfWishlisted", null);
exports.WishlistsController = WishlistsController = __decorate([
    (0, swagger_1.ApiTags)('Wishlists'),
    (0, common_1.Controller)('wishlists'),
    __metadata("design:paramtypes", [wishlists_service_1.WishlistsService])
], WishlistsController);
//# sourceMappingURL=wishlists.controller.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const category_entity_1 = require("./../../categories/entities/category.entity");
const orders_products_entity_1 = require("./../../orders/entities/orders-products.entity");
const review_entity_1 = require("./../../reviews/entities/review.entity");
const user_entity_1 = require("./../../users/entities/user.entity");
const wishlists_items_entity_1 = require("./../../wishlists/entities/wishlists-items.entity");
const typeorm_1 = require("typeorm");
let ProductEntity = class ProductEntity {
    id;
    title;
    description;
    price;
    stock;
    images;
    createdAt;
    updatedAt;
    addedBy;
    category;
    reviews;
    products;
    wishlistedBy;
};
exports.ProductEntity = ProductEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], ProductEntity.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], ProductEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], ProductEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.products, { onDelete: 'SET NULL' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProductEntity.prototype, "addedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, (category) => category.products, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Object)
], ProductEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (rev) => rev.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_products_entity_1.OrdersProductsEntity, (op) => op.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => wishlists_items_entity_1.WishlistItemEntity, (wishlistItem) => wishlistItem.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "wishlistedBy", void 0);
exports.ProductEntity = ProductEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'products' })
], ProductEntity);
//# sourceMappingURL=product.entity.js.map
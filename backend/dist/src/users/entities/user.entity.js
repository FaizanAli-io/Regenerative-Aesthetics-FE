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
exports.UserEntity = void 0;
const class_transformer_1 = require("class-transformer");
const category_entity_1 = require("./../../categories/entities/category.entity");
const order_entity_1 = require("./../../orders/entities/order.entity");
const product_entity_1 = require("./../../products/entities/product.entity");
const review_entity_1 = require("./../../reviews/entities/review.entity");
const user_roles_enum_1 = require("./../../utility/common/user-roles.enum");
const wishlists_items_entity_1 = require("./../../wishlists/entities/wishlists-items.entity");
const typeorm_1 = require("typeorm");
const address_book_entity_1 = require("./address-book.entity");
let UserEntity = class UserEntity {
    id;
    name;
    email;
    password;
    roles;
    isVerified;
    verificationToken;
    verificationTokenExpires;
    resetPasswordToken;
    resetPasswordTokenExpires;
    createdAt;
    updatedAt;
    categories;
    products;
    reviews;
    ordersUpdateBy;
    orders;
    wishlistItems;
    contactDetails;
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_roles_enum_1.Roles,
        array: true,
        default: [user_roles_enum_1.Roles.USER],
        enumName: 'user_role_enum',
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "roles", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isVerified", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "verificationToken", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "verificationTokenExpires", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "resetPasswordToken", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "resetPasswordTokenExpires", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.CategoryEntity, (cat) => cat.addedBy),
    __metadata("design:type", Array)
], UserEntity.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (prod) => prod.addedBy),
    __metadata("design:type", Array)
], UserEntity.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => review_entity_1.ReviewEntity, (rev) => rev.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => order_entity_1.OrderEntity, (order) => order.updatedBy),
    __metadata("design:type", Array)
], UserEntity.prototype, "ordersUpdateBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (order) => order.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => wishlists_items_entity_1.WishlistItemEntity, (wishlistItem) => wishlistItem.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "wishlistItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_book_entity_1.AddressBookEntity, (addBook) => addBook.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "contactDetails", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], UserEntity);
//# sourceMappingURL=user.entity.js.map
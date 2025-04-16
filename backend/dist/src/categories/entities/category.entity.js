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
exports.CategoryEntity = void 0;
const product_entity_1 = require("./../../products/entities/product.entity");
const user_entity_1 = require("./../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let CategoryEntity = class CategoryEntity {
    id;
    title;
    description;
    createdAt;
    updatedAt;
    addedBy;
    products;
    parentCategory;
    children;
};
exports.CategoryEntity = CategoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CategoryEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CategoryEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], CategoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeorm_1.Timestamp)
], CategoryEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.categories, { onDelete: 'SET NULL' }),
    __metadata("design:type", user_entity_1.UserEntity)
], CategoryEntity.prototype, "addedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (prod) => prod.category),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CategoryEntity, (category) => category.children, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Object)
], CategoryEntity.prototype, "parentCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CategoryEntity, (category) => category.parentCategory),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "children", void 0);
exports.CategoryEntity = CategoryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'categories' })
], CategoryEntity);
//# sourceMappingURL=category.entity.js.map
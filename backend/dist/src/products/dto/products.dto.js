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
exports.ProductsDto = exports.ProductList = exports.CategoryDto = void 0;
const class_transformer_1 = require("class-transformer");
class CategoryDto {
    id;
    title;
    description;
    createdAt;
    updatedAt;
    addedById;
    parentCategoryId;
}
exports.CategoryDto = CategoryDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CategoryDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CategoryDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CategoryDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CategoryDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CategoryDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CategoryDto.prototype, "addedById", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], CategoryDto.prototype, "parentCategoryId", void 0);
class ProductList {
    id;
    title;
    description;
    price;
    stock;
    images;
    createdAt;
    updatedAt;
    addedById;
    reviewCount;
    avgRating;
    category;
}
exports.ProductList = ProductList;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductList.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProductList.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProductList.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductList.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductList.prototype, "stock", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], ProductList.prototype, "images", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ProductList.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ProductList.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductList.prototype, "addedById", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductList.prototype, "reviewCount", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductList.prototype, "avgRating", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => CategoryDto),
    __metadata("design:type", CategoryDto)
], ProductList.prototype, "category", void 0);
class ProductsDto {
    totalProducts;
    limit;
    products;
}
exports.ProductsDto = ProductsDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductsDto.prototype, "totalProducts", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductsDto.prototype, "limit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ProductList),
    __metadata("design:type", Array)
], ProductsDto.prototype, "products", void 0);
//# sourceMappingURL=products.dto.js.map
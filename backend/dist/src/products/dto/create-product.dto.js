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
exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateProductDto {
    title;
    description;
    price;
    stock;
    images;
    categoryId;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product title',
        example: 'Premium Wireless Headphones',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Title can not be empty.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed product description',
        example: 'Noise-cancelling Bluetooth headphones with 30-hour battery life',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Description can not be empty.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product price (USD)',
        example: 199.99,
        type: 'number',
        format: 'decimal',
        minimum: 0.01,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Price can not be empty.',
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, {
        message: 'Price should be a number with precision of 2.',
    }),
    (0, class_validator_1.IsPositive)({
        message: 'Price should be a positive number.',
    }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Available stock quantity',
        example: 100,
        minimum: 0,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Stock can not be empty.',
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Stock should be a number.' }),
    (0, class_validator_1.Min)(0, {
        message: 'Stock can not be negative.',
    }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of image URLs',
        example: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
        ],
        type: [String],
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Images can not be empty',
    }),
    (0, class_validator_1.IsArray)({
        message: 'Images should be in array format.',
    }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product category',
        example: 1,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Category can not be empty',
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Category Id should be a number' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "categoryId", void 0);
//# sourceMappingURL=create-product.dto.js.map
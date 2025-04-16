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
exports.OrderedProductsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class OrderedProductsDto {
    id;
    product_quantity;
}
exports.OrderedProductsDto = OrderedProductsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product ID',
        example: 1,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Product can not be empty',
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Product should be a number.' }),
    __metadata("design:type", Number)
], OrderedProductsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of the product',
        example: 2,
        minimum: 1,
        required: true,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Quantity should be a number.' }),
    (0, class_validator_1.IsPositive)({
        message: 'Quantity can not be negative.',
    }),
    __metadata("design:type", Number)
], OrderedProductsDto.prototype, "product_quantity", void 0);
//# sourceMappingURL=ordered-products.dto.js.map
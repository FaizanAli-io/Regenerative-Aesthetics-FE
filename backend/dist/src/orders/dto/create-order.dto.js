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
exports.CreateOrderDto = void 0;
const class_transformer_1 = require("class-transformer");
const create_shipping_dto_1 = require("./create-shipping.dto");
const class_validator_1 = require("class-validator");
const ordered_products_dto_1 = require("./ordered-products.dto");
const swagger_1 = require("@nestjs/swagger");
class CreateOrderDto {
    shippingAddress;
    products;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Shipping address details',
        type: () => create_shipping_dto_1.CreateShippingDto,
        example: {
            phone: '+1234567890',
            address: '123 Main St',
            city: 'New York',
            postalCode: '10001',
            state: 'NY',
            country: 'USA',
        },
    }),
    (0, class_transformer_1.Type)(() => create_shipping_dto_1.CreateShippingDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", create_shipping_dto_1.CreateShippingDto)
], CreateOrderDto.prototype, "shippingAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of ordered products',
        type: () => ordered_products_dto_1.OrderedProductsDto,
        isArray: true,
        example: [{ id: 1, product_quantity: 3 }],
    }),
    (0, class_transformer_1.Type)(() => ordered_products_dto_1.OrderedProductsDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "products", void 0);
//# sourceMappingURL=create-order.dto.js.map
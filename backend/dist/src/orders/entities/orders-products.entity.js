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
exports.OrdersProductsEntity = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const product_entity_1 = require("./../../products/entities/product.entity");
let OrdersProductsEntity = class OrdersProductsEntity {
    id;
    product_unit_price;
    product_quantity;
    order;
    product;
};
exports.OrdersProductsEntity = OrdersProductsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrdersProductsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], OrdersProductsEntity.prototype, "product_unit_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrdersProductsEntity.prototype, "product_quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.OrderEntity, (order) => order.products),
    __metadata("design:type", order_entity_1.OrderEntity)
], OrdersProductsEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (prod) => prod.products, { cascade: true }),
    __metadata("design:type", product_entity_1.ProductEntity)
], OrdersProductsEntity.prototype, "product", void 0);
exports.OrdersProductsEntity = OrdersProductsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders_products' })
], OrdersProductsEntity);
//# sourceMappingURL=orders-products.entity.js.map
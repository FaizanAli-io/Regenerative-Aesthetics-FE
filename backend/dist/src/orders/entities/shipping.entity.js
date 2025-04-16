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
exports.ShippingEntity = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
let ShippingEntity = class ShippingEntity {
    id;
    phone;
    name;
    address;
    city;
    postalCode;
    state;
    country;
    order;
};
exports.ShippingEntity = ShippingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ShippingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ShippingEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingEntity.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_entity_1.OrderEntity, (order) => order.shippingAddress),
    __metadata("design:type", order_entity_1.OrderEntity)
], ShippingEntity.prototype, "order", void 0);
exports.ShippingEntity = ShippingEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'shippings' })
], ShippingEntity);
//# sourceMappingURL=shipping.entity.js.map
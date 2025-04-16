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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const authentication_guard_1 = require("./../utility/common/guards/authentication.guard");
const current_user_decorator_1 = require("./../utility/common/decorators/current-user.decorator");
const user_entity_1 = require("./../users/entities/user.entity");
const order_entity_1 = require("./entities/order.entity");
const authorization_guard_1 = require("./../utility/common/guards/authorization.guard");
const user_roles_enum_1 = require("./../utility/common/user-roles.enum");
const update_order_status_dto_1 = require("./dto/update-order-status.dto");
const create_cart_dto_1 = require("./dto/create-cart.dto");
const ordered_products_dto_1 = require("./dto/ordered-products.dto");
const create_shipping_dto_1 = require("./dto/create-shipping.dto");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(createOrderDto, currentUser) {
        return await this.ordersService.create(createOrderDto, currentUser);
    }
    async findAll(limit, offset, status) {
        return await this.ordersService.findAll(limit, offset, status);
    }
    async findMyOrders(currentUser, limit, offset, status) {
        return await this.ordersService.findAll(limit, offset, status, currentUser.id);
    }
    async findOne(id) {
        return await this.ordersService.findOne(id);
    }
    async update(id, updateOrderStatusDto, currentUser) {
        return await this.ordersService.update(id, updateOrderStatusDto, currentUser);
    }
    async cancelledOrder(id, currentUser) {
        return await this.ordersService.cancelled(id, currentUser);
    }
    async remove(id) {
        return await this.ordersService.remove(id);
    }
    async getCart(currentUser) {
        return this.ordersService.getOrCreateUserCart(currentUser.id);
    }
    async addProductToCart(orderedProductsDto, currentUser) {
        return await this.ordersService.addProductToCart(orderedProductsDto, currentUser);
    }
    async removeProductFromCart(id, currentUser) {
        return this.ordersService.removeProductFromCart(id, currentUser);
    }
    async checkout(createShippingDto, currentUser) {
        return await this.ordersService.checkout(createShippingDto, currentUser);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new order' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The order has been successfully created.',
        type: order_entity_1.OrderEntity,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all orders (admin)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns a list of orders.',
        type: [order_entity_1.OrderEntity],
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden. Admin access required.',
    }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.USER])),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get your own orders',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns your own orders.',
        type: [order_entity_1.OrderEntity],
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden. User access required.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, Number, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findMyOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.USER])),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get an order by ID (admin)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the order details.',
        type: order_entity_1.OrderEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Order not found.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Update an order status',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The order status has been successfully updated.',
        type: order_entity_1.OrderEntity,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_status_dto_1.UpdateOrderStatusDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('cancel/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Cancel an order by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The order has been successfully cancelled.',
        type: order_entity_1.OrderEntity,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "cancelledOrder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete an order by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The order has been successfully deleted.',
        type: order_entity_1.OrderEntity,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Get)('cart/mine'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the current user’s cart',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the current user’s cart.',
        type: create_cart_dto_1.CreateCartDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getCart", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)('cart'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Add a product to the cart',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The product has been successfully added to the cart.',
        type: ordered_products_dto_1.OrderedProductsDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ordered_products_dto_1.OrderedProductsDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addProductToCart", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Delete)('cart/remove/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove a product from the cart',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The product has been successfully removed from the cart.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "removeProductFromCart", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)('cart/checkout'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Checkout the cart' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The cart has been successfully checked out.',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipping_dto_1.CreateShippingDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "checkout", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map
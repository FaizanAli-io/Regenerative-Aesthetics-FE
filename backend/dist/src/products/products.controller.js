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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const current_user_decorator_1 = require("./../utility/common/decorators/current-user.decorator");
const user_entity_1 = require("./../users/entities/user.entity");
const authentication_guard_1 = require("./../utility/common/guards/authentication.guard");
const authorization_guard_1 = require("./../utility/common/guards/authorization.guard");
const user_roles_enum_1 = require("./../utility/common/user-roles.enum");
const product_entity_1 = require("./entities/product.entity");
const serialize_interceptor_1 = require("./../utility/common/interceptors/serialize.interceptor");
const products_dto_1 = require("./dto/products.dto");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto, currentUser) {
        return await this.productsService.create(createProductDto, currentUser);
    }
    async findAll(query) {
        return await this.productsService.findAll(query);
    }
    async findOne(id) {
        return await this.productsService.findOne(+id);
    }
    async update(id, updateProductDto, currentUser) {
        return await this.productsService.update(+id, updateProductDto, currentUser);
    }
    async remove(id) {
        return await this.productsService.remove(+id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new product',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The product has been successfully created.',
        type: product_entity_1.ProductEntity,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, serialize_interceptor_1.SerializeIncludes)(products_dto_1.ProductsDto),
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns a list of all products.',
        type: products_dto_1.ProductsDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a single product by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the product details.',
        type: product_entity_1.ProductEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a product by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The product has been successfully updated.',
        type: product_entity_1.ProductEntity,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a product by ID (Admin Only)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The product has been successfully deleted.',
        type: product_entity_1.ProductEntity,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map
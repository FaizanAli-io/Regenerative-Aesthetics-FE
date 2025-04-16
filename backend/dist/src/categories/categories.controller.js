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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const current_user_decorator_1 = require("./../utility/common/decorators/current-user.decorator");
const user_entity_1 = require("./../users/entities/user.entity");
const authentication_guard_1 = require("./../utility/common/guards/authentication.guard");
const authorization_guard_1 = require("./../utility/common/guards/authorization.guard");
const user_roles_enum_1 = require("./../utility/common/user-roles.enum");
const category_entity_1 = require("./entities/category.entity");
const typeorm_1 = require("typeorm");
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async create(createCategoryDto, currentUser) {
        return await this.categoriesService.create(createCategoryDto, currentUser);
    }
    async findAll() {
        return await this.categoriesService.findAll();
    }
    async findOne(id) {
        return await this.categoriesService.findOne(+id);
    }
    async getChildren(id) {
        const category = await this.categoriesService.findOne(+id);
        return category.children || [];
    }
    async update(id, updateCategoryDto) {
        return await this.categoriesService.update(+id, updateCategoryDto);
    }
    async remove(id) {
        return await this.categoriesService.remove(+id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new category',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The category has been successfully created.',
        type: category_entity_1.CategoryEntity,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all categories' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all categories.',
        type: [category_entity_1.CategoryEntity],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a single category by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the category by ID.',
        type: category_entity_1.CategoryEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Category not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/children'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all child categories of a given category ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all child categories of the given category ID.',
        type: [category_entity_1.CategoryEntity],
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Category not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getChildren", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a category by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The category has been successfully updated.',
        type: category_entity_1.CategoryEntity,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a category by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The category has been successfully deleted.',
        type: typeorm_1.DeleteResult,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map
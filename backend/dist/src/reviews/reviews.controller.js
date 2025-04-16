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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reviews_service_1 = require("./reviews.service");
const create_review_dto_1 = require("./dto/create-review.dto");
const update_review_dto_1 = require("./dto/update-review.dto");
const authentication_guard_1 = require("./../utility/common/guards/authentication.guard");
const current_user_decorator_1 = require("./../utility/common/decorators/current-user.decorator");
const user_entity_1 = require("./../users/entities/user.entity");
const review_entity_1 = require("./entities/review.entity");
const authorization_guard_1 = require("./../utility/common/guards/authorization.guard");
const user_roles_enum_1 = require("./../utility/common/user-roles.enum");
let ReviewsController = class ReviewsController {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async create(createReviewDto, currentUser) {
        return await this.reviewsService.create(createReviewDto, currentUser);
    }
    async findAll() {
        return await this.reviewsService.findAll();
    }
    async findAllByProduct(productId) {
        return await this.reviewsService.findAllByProduct(+productId);
    }
    async findOne(id) {
        return await this.reviewsService.findOne(+id);
    }
    async update(id, updateReviewDto, currentUser) {
        return this.reviewsService.update(+id, updateReviewDto, currentUser);
    }
    async remove(id) {
        return this.reviewsService.remove(+id);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new review',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The review has been successfully created.',
        type: review_entity_1.ReviewEntity,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviews' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns a list of all reviews.',
        type: [review_entity_1.ReviewEntity],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get reviews by product ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns reviews for a specific product.',
        type: [review_entity_1.ReviewEntity],
    }),
    __param(0, (0, common_1.Body)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findAllByProduct", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a review by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the review details.',
        type: review_entity_1.ReviewEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Review not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a review by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The review has been successfully updated.',
        type: review_entity_1.ReviewEntity,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_review_dto_1.UpdateReviewDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a review by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The review has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Review not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "remove", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Reviews'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map
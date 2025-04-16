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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const review_entity_1 = require("./entities/review.entity");
const typeorm_2 = require("typeorm");
const products_service_1 = require("./../products/products.service");
let ReviewsService = class ReviewsService {
    reviewRepository;
    productService;
    constructor(reviewRepository, productService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
    }
    async create(createReviewDto, currentUser) {
        const product = await this.productService.findOne(+createReviewDto.productId);
        let review = await this.findOneByUserAndProduct(currentUser.id, createReviewDto.productId);
        if (!review) {
            review = this.reviewRepository.create(createReviewDto);
            review.user = currentUser;
            review.product = product;
        }
        else {
            review.comment = createReviewDto.comment;
            review.ratings = createReviewDto.ratings;
        }
        return await this.reviewRepository.save(review);
    }
    async findAll() {
        return await this.reviewRepository.find({
            relations: {
                user: true,
                product: {
                    category: true,
                },
            },
        });
    }
    async findAllByProduct(id) {
        const product = await this.productService.findOne(id);
        return await this.reviewRepository.find({
            where: { product: { id } },
            relations: {
                user: true,
                product: {
                    category: true,
                },
            },
        });
    }
    async findOne(id) {
        const review = await this.reviewRepository.findOne({
            where: { id: id },
            relations: {
                user: true,
                product: {
                    category: true,
                },
            },
        });
        if (!review)
            throw new common_1.NotFoundException('Review not found.');
        return review;
    }
    async update(id, updateReviewDto, currentUser) {
        const review = await this.findOne(id);
        if ((await review).user.id !== currentUser.id)
            throw new common_1.NotAcceptableException('User cannot update this review as they are not its author.');
        if (updateReviewDto.comment)
            (await review).comment =
                updateReviewDto.comment;
        if (updateReviewDto.ratings)
            (await review).ratings =
                updateReviewDto.ratings;
        return await this.reviewRepository.save(review);
    }
    async remove(id) {
        const review = await this.findOne(id);
        return this.reviewRepository.remove(review);
    }
    async findOneByUserAndProduct(userId, productId) {
        return await this.reviewRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
            relations: {
                user: true,
                product: {
                    category: true,
                },
            },
        });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.ReviewEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map
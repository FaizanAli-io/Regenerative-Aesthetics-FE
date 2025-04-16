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
exports.CreateReviewDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateReviewDto {
    ratings;
    comment;
    productId;
}
exports.CreateReviewDto = CreateReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rating from 1 to 5 stars',
        example: 5,
        minimum: 1,
        maximum: 5,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Rating has to be provided.',
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Rating should be a number.' }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "ratings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed review comment',
        example: 'Excellent product quality and fast delivery!',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Comment has to be provided.',
    }),
    (0, class_validator_1.IsString)({
        message: 'Comment should be a string.',
    }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product being reviewed',
        example: 1,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Product Id should not be empty.',
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'Product Id should be a number.' }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "productId", void 0);
//# sourceMappingURL=create-review.dto.js.map
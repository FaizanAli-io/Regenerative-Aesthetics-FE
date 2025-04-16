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
exports.AddContactDetailsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class AddContactDetailsDto {
    phone;
    address;
    city;
    postalCode;
    state;
    country;
    label;
}
exports.AddContactDetailsDto = AddContactDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact phone number',
        example: '+1234567890',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Phone can not be empty',
    }),
    (0, class_validator_1.IsString)({
        message: 'Phone should be a string.',
    }),
    __metadata("design:type", String)
], AddContactDetailsDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Street address',
        example: '123 Main Street',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Address can not be empty',
    }),
    (0, class_validator_1.IsString)({
        message: 'Address should be a string.',
    }),
    __metadata("design:type", String)
], AddContactDetailsDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'City name',
        example: 'New York',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'City can not be empty',
    }),
    (0, class_validator_1.IsString)({
        message: 'City should be a string.',
    }),
    __metadata("design:type", String)
], AddContactDetailsDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Postal/ZIP code',
        example: '10001',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Postal Code can not be empty',
    }),
    (0, class_validator_1.IsString)({
        message: 'Postal Code be a string.',
    }),
    __metadata("design:type", String)
], AddContactDetailsDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'State/Province',
        example: 'NY',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'State can not be empty',
    }),
    (0, class_validator_1.IsString)({
        message: 'State should be a string.',
    }),
    __metadata("design:type", String)
], AddContactDetailsDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Country code',
        example: 'USA',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Country can not be empty',
    }),
    (0, class_validator_1.IsString)({
        message: 'Country should be a string.',
    }),
    __metadata("design:type", String)
], AddContactDetailsDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Label',
        example: 'Home',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Label can not be empty',
    }),
    (0, class_validator_1.IsString)({
        message: 'Label should be a string.',
    }),
    __metadata("design:type", String)
], AddContactDetailsDto.prototype, "label", void 0);
//# sourceMappingURL=add-contact-details.dto.js.map
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
exports.UserSignInDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UserSignInDto {
    email;
    password;
}
exports.UserSignInDto = UserSignInDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Registered email address',
        example: 'user@example.com',
        required: true,
        format: 'email',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Email can not be empty.',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Please provide a valid email.' }),
    __metadata("design:type", String)
], UserSignInDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Account password',
        example: 'Password123!',
        required: true,
        minLength: 5,
        maxLength: 20,
        pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[\\d\\W]).*$',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Password can not be empty.',
    }),
    (0, class_validator_1.MinLength)(5, {
        message: 'Password minimum character length should be 5.',
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'Password maximum character length should be 20.',
    }),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain: 1 uppercase, 1 lowercase, 1 number/special character',
    }),
    __metadata("design:type", String)
], UserSignInDto.prototype, "password", void 0);
//# sourceMappingURL=user-signin.dto.js.map
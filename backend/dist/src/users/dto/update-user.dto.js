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
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateUserDto {
    name;
    password;
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full name of the user',
        example: 'John Doe',
        required: false,
        minLength: 2,
        maxLength: 50,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Name can not be empty.',
    }),
    (0, class_validator_1.IsString)({
        message: 'Name should be a string.',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Account password',
        example: 'Password123!',
        required: false,
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
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
//# sourceMappingURL=update-user.dto.js.map
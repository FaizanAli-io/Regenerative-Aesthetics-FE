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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_signup_dto_1 = require("./dto/user-signup.dto");
const user_entity_1 = require("./entities/user.entity");
const user_signin_dto_1 = require("./dto/user-signin.dto");
const current_user_decorator_1 = require("./../utility/common/decorators/current-user.decorator");
const authentication_guard_1 = require("./../utility/common/guards/authentication.guard");
const user_roles_enum_1 = require("./../utility/common/user-roles.enum");
const authorization_guard_1 = require("./../utility/common/guards/authorization.guard");
const add_contact_details_dto_1 = require("./dto/add-contact-details.dto");
const update_contact_details_dto_1 = require("./dto/update-contact-details.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signup(userSignUpDto) {
        return {
            user: await this.usersService.signup(userSignUpDto),
        };
    }
    async signin(userSignInDto) {
        const user = await this.usersService.signin(userSignInDto);
        const accessToken = await this.usersService.accessToken(user);
        return { accessToken, user };
    }
    async verifyEmail(token) {
        await this.usersService.verifyEmailToken(token);
        return {
            message: 'Email verified successfully',
        };
    }
    async forgotPassword(email) {
        await this.usersService.requestPasswordReset(email);
        return {
            message: 'If your email is registered, you will receive a password reset link shortly.',
        };
    }
    async resetPassword(token, newPassword) {
        await this.usersService.resetPassword(token, newPassword);
        return {
            message: 'Password has been reset successfully.',
        };
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    async findOne(id) {
        const user = await this.usersService.findOne(+id);
        if (!user)
            throw new common_1.NotFoundException('User not found.');
        return user;
    }
    async update(updateUserDto, currentUser) {
        return await this.usersService.update(currentUser.id, updateUserDto);
    }
    getProfile(currentUser) {
        return currentUser;
    }
    async addContactDetails(currentUser, addContactDetailsDto) {
        return await this.usersService.addContactDetails(currentUser, addContactDetailsDto);
    }
    async getContactDetails(currentUser) {
        return await this.usersService.getContactDetails(currentUser);
    }
    async updateContactDetails(id, currentUser, updateContactDetailsDto) {
        return await this.usersService.updateContactDetails(id, currentUser, updateContactDetailsDto);
    }
    async deleteContactDetails(id, currentUser) {
        return await this.usersService.deleteContactDetails(id, currentUser);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({ summary: 'User Sign Up' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The user has been successfully signed up.',
        type: user_entity_1.UserEntity,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signup_dto_1.UserSignUpDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiOperation)({ summary: 'User Sign In' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully signed in.',
        type: user_entity_1.UserEntity,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signin_dto_1.UserSignInDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('verify-email'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify User Email' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Email verified successfully.',
    }),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, swagger_1.ApiOperation)({
        summary: 'Request password reset link',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reset link sent to email if user exists.',
    }),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reset password with token',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Password reset successful.',
    }),
    __param(0, (0, common_1.Body)('token')),
    __param(1, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizeGuard)([user_roles_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all users (Admin Only)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all users.',
        type: [user_entity_1.UserEntity],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('single/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a single user by ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns a user by ID.',
        type: user_entity_1.UserEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'User not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Patch)(''),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Update current user details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user details have been successfully updated.',
        type: user_entity_1.UserEntity,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get current logged-in user profile',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the current logged-in user.',
        type: user_entity_1.UserEntity,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Post)('contact'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Add contact details for a user.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        add_contact_details_dto_1.AddContactDetailsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addContactDetails", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Get)('contact'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all saved contact details of a user',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getContactDetails", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Patch)('contact/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Update contact details of a user by instance id.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserEntity,
        update_contact_details_dto_1.UpdateContactDetailsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateContactDetails", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, common_1.Delete)('contact/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete contact details by instance id.',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteContactDetails", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map
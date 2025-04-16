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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const emails_service_1 = require("./../emails/emails.service");
const crypto = require("crypto");
const address_book_entity_1 = require("./entities/address-book.entity");
let UsersService = class UsersService {
    usersRepository;
    addressBookRepository;
    emailService;
    constructor(usersRepository, addressBookRepository, emailService) {
        this.usersRepository = usersRepository;
        this.addressBookRepository = addressBookRepository;
        this.emailService = emailService;
    }
    async signup(userSignUpDto) {
        const userExists = await this.findUserByEmail(userSignUpDto.email);
        if (userExists)
            throw new common_1.BadRequestException('Email is not available.');
        userSignUpDto.password = await (0, bcrypt_1.hash)(userSignUpDto.password, 10);
        const verificationToken = crypto
            .randomBytes(20)
            .toString('hex');
        const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        let user = this.usersRepository.create({
            ...userSignUpDto,
            isVerified: false,
            verificationToken,
            verificationTokenExpires,
        });
        user = await this.usersRepository.save(user);
        await this.emailService.sendVerificationEmail(user.email, verificationToken);
        delete user.password;
        return user;
    }
    async verifyEmailToken(token) {
        const user = await this.usersRepository.findOne({
            where: {
                verificationToken: token,
                verificationTokenExpires: (0, typeorm_2.MoreThan)(new Date()),
            },
        });
        if (!user)
            throw new common_1.BadRequestException('Invalid or expired token.');
        user.isVerified = true;
        return this.usersRepository.save(user);
    }
    async signin(userSignInDto) {
        const userExists = await this.usersRepository
            .createQueryBuilder('users')
            .addSelect('users.password')
            .where('users.email=:email', {
            email: userSignInDto.email,
        })
            .getOne();
        if (!userExists)
            throw new common_1.BadRequestException('Bad credentials.');
        const matchPassword = await (0, bcrypt_1.compare)(userSignInDto.password, userExists.password);
        if (!matchPassword)
            throw new common_1.BadRequestException('Bad credentials.');
        if (!userExists.isVerified) {
            throw new common_1.BadRequestException('Email not verified.');
        }
        delete userExists.password;
        return userExists;
    }
    async requestPasswordReset(email) {
        const user = await this.findUserByEmail(email);
        if (!user)
            return;
        const resetToken = crypto
            .randomBytes(32)
            .toString('hex');
        const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpires =
            resetTokenExpires;
        await this.usersRepository.save(user);
        await this.emailService.sendResetPasswordEmail(user.email, resetToken);
    }
    async resetPassword(token, newPassword) {
        const user = await this.usersRepository.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordTokenExpires: (0, typeorm_2.MoreThan)(new Date()),
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired token.');
        }
        user.password = await (0, bcrypt_1.hash)(newPassword, 10);
        await this.usersRepository.save(user);
    }
    async accessToken(user) {
        return (0, jsonwebtoken_1.sign)({
            id: user.id,
            email: user.email,
        }, process.env
            .ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: process.env
                .ACCESS_TOKEN_EXPIRE_TIME
                ? parseInt(process.env
                    .ACCESS_TOKEN_EXPIRE_TIME, 10)
                : 3600,
        });
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOneBy({
            id,
        });
        if (!user)
            throw new common_1.NotFoundException(`User ${id} not found.`);
        return user;
    }
    async update(id, fields) {
        const user = await this.findOne(id);
        if (fields.name)
            (await user).name = fields.name;
        if (fields.password)
            (await user).password = fields.password;
        return await this.usersRepository.save(user);
    }
    async findUserByEmail(email) {
        return await this.usersRepository.findOneBy({
            email,
        });
    }
    async addContactDetails(currentUser, addContactDetailsDto) {
        let contactDetails = new address_book_entity_1.AddressBookEntity();
        contactDetails.address =
            addContactDetailsDto.address;
        contactDetails.city =
            addContactDetailsDto.city;
        contactDetails.country =
            addContactDetailsDto.country;
        contactDetails.phone =
            addContactDetailsDto.phone;
        contactDetails.postalCode =
            addContactDetailsDto.postalCode;
        contactDetails.state =
            addContactDetailsDto.state;
        contactDetails.label =
            addContactDetailsDto.label;
        contactDetails.name = currentUser.name;
        contactDetails.user = currentUser;
        return await this.addressBookRepository.save(contactDetails);
    }
    async getContactDetails(currentUser) {
        return await this.addressBookRepository.find({
            where: { user: { id: currentUser.id } },
        });
    }
    async updateContactDetails(id, currentUser, updateContactDetailsDto) {
        const record = await this.addressBookRepository.findOne({
            where: {
                id: id,
                user: { id: currentUser.id },
            },
        });
        if (!record)
            throw new common_1.NotFoundException('Invalid or unauthorized contact details id.');
        if (updateContactDetailsDto.address)
            record.address =
                updateContactDetailsDto.address;
        if (updateContactDetailsDto.city)
            record.city = updateContactDetailsDto.city;
        if (updateContactDetailsDto.country)
            record.country =
                updateContactDetailsDto.country;
        if (updateContactDetailsDto.label)
            record.label =
                updateContactDetailsDto.label;
        if (updateContactDetailsDto.phone)
            record.phone =
                updateContactDetailsDto.phone;
        if (updateContactDetailsDto.postalCode)
            record.postalCode =
                updateContactDetailsDto.postalCode;
        if (updateContactDetailsDto.state)
            record.state =
                updateContactDetailsDto.state;
        return await this.addressBookRepository.save(record);
    }
    async deleteContactDetails(id, currentUser) {
        const result = await this.addressBookRepository.delete({
            id: id,
            user: { id: currentUser.id },
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Invalid or unauthorized contact details id.');
        }
        return {
            message: 'Contact deleted successfully.',
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(address_book_entity_1.AddressBookEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        emails_service_1.EmailsService])
], UsersService);
//# sourceMappingURL=users.service.js.map
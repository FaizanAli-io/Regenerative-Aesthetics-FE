import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { AddContactDetailsDto } from './dto/add-contact-details.dto';
import { AddressBookEntity } from './entities/address-book.entity';
import { UpdateContactDetailsDto } from './dto/update-contact-details.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(userSignUpDto: UserSignUpDto): Promise<{
        user: UserEntity;
    }>;
    signin(userSignInDto: UserSignInDto): Promise<{
        accessToken: string;
        user: UserEntity;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    update(updateUserDto: UpdateUserDto, currentUser: UserEntity): Promise<UserEntity>;
    getProfile(currentUser: UserEntity): UserEntity;
    addContactDetails(currentUser: UserEntity, addContactDetailsDto: AddContactDetailsDto): Promise<AddressBookEntity>;
    getContactDetails(currentUser: UserEntity): Promise<AddressBookEntity[]>;
    updateContactDetails(id: number, currentUser: UserEntity, updateContactDetailsDto: UpdateContactDetailsDto): Promise<AddressBookEntity>;
    deleteContactDetails(id: number, currentUser: UserEntity): Promise<{
        message: string;
    }>;
}

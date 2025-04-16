import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-signin.dto';
import { EmailsService } from './../emails/emails.service';
import { AddContactDetailsDto } from './dto/add-contact-details.dto';
import { AddressBookEntity } from './entities/address-book.entity';
import { UpdateContactDetailsDto } from './dto/update-contact-details.dto';
export declare class UsersService {
    private usersRepository;
    private addressBookRepository;
    private emailService;
    constructor(usersRepository: Repository<UserEntity>, addressBookRepository: Repository<AddressBookEntity>, emailService: EmailsService);
    signup(userSignUpDto: UserSignUpDto): Promise<UserEntity>;
    verifyEmailToken(token: string): Promise<UserEntity>;
    signin(userSignInDto: UserSignInDto): Promise<UserEntity>;
    requestPasswordReset(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    accessToken(user: UserEntity): Promise<string>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    update(id: number, fields: Partial<UpdateUserDto>): Promise<UserEntity>;
    findUserByEmail(email: string): Promise<UserEntity | null>;
    addContactDetails(currentUser: UserEntity, addContactDetailsDto: AddContactDetailsDto): Promise<AddressBookEntity>;
    getContactDetails(currentUser: UserEntity): Promise<AddressBookEntity[]>;
    updateContactDetails(id: number, currentUser: UserEntity, updateContactDetailsDto: UpdateContactDetailsDto): Promise<AddressBookEntity>;
    deleteContactDetails(id: number, currentUser: UserEntity): Promise<{
        message: string;
    }>;
}

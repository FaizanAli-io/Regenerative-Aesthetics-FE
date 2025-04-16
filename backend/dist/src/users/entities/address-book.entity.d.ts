import { UserEntity } from './user.entity';
export declare class AddressBookEntity {
    id: number;
    phone: string;
    name?: string;
    address: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    label: string;
    user: UserEntity;
}

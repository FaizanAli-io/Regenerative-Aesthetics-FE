import { OrderEntity } from './order.entity';
export declare class ShippingEntity {
    id: number;
    phone: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    order: OrderEntity;
}

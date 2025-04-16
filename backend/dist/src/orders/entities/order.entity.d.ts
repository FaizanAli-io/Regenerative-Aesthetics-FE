import { Timestamp } from 'typeorm';
import { UserEntity } from './../../users/entities/user.entity';
import { ShippingEntity } from './shipping.entity';
import { OrdersProductsEntity } from './orders-products.entity';
export declare class OrderEntity {
    id: number;
    orderAt: Timestamp;
    status: string;
    shippedAt: Date;
    deliveredAt: Date;
    updatedBy: UserEntity;
    shippingAddress?: ShippingEntity;
    products: OrdersProductsEntity[];
    get totalAmount(): number;
    user: UserEntity;
}

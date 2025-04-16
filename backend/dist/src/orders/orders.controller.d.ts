import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserEntity } from './../users/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderedProductsDto } from './dto/ordered-products.dto';
import { CreateShippingDto } from './dto/create-shipping.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, currentUser: UserEntity): Promise<OrderEntity | null>;
    findAll(limit: number, offset: number, status?: 'processing' | 'shipped' | 'delivered' | 'cancelled'): Promise<OrderEntity[]>;
    findMyOrders(currentUser: UserEntity, limit: number, offset: number, status?: 'processing' | 'shipped' | 'delivered' | 'cancelled'): Promise<OrderEntity[]>;
    findOne(id: number): Promise<OrderEntity>;
    update(id: number, updateOrderStatusDto: UpdateOrderStatusDto, currentUser: UserEntity): Promise<OrderEntity>;
    cancelledOrder(id: number, currentUser: UserEntity): Promise<OrderEntity>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getCart(currentUser: UserEntity): Promise<OrderEntity>;
    addProductToCart(orderedProductsDto: OrderedProductsDto, currentUser: UserEntity): Promise<{
        totalPrice: number;
        products: {
            id: number;
            product_unit_price: number;
            product_quantity: number;
            product: import("../products/entities/product.entity").ProductEntity;
        }[];
        id: number;
        orderAt: import("typeorm").Timestamp;
        status: string;
        shippedAt: Date;
        deliveredAt: Date;
        updatedBy: UserEntity;
        shippingAddress?: import("./entities/shipping.entity").ShippingEntity;
        user: UserEntity;
    }>;
    removeProductFromCart(id: number, currentUser: UserEntity): Promise<{
        message: string;
    }>;
    checkout(createShippingDto: CreateShippingDto, currentUser: UserEntity): Promise<{
        products: {
            id: number;
            product_unit_price: number;
            product_quantity: number;
            product: import("../products/entities/product.entity").ProductEntity;
        }[];
        shippingAddress: {
            order: undefined;
            id: number;
            phone: string;
            name: string;
            address: string;
            city: string;
            postalCode: string;
            state: string;
            country: string;
        } | null;
        id: number;
        orderAt: import("typeorm").Timestamp;
        status: string;
        shippedAt: Date;
        deliveredAt: Date;
        updatedBy: UserEntity;
        user: UserEntity;
    }>;
}

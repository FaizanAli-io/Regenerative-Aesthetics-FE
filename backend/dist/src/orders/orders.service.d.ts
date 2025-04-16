import { CreateOrderDto } from './dto/create-order.dto';
import { UserEntity } from './../users/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { EntityManager, Repository, Timestamp } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductEntity } from './../products/entities/product.entity';
import { ProductsService } from './../products/products.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UsersService } from './../users/users.service';
import { OrderedProductsDto } from './dto/ordered-products.dto';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { EmailsService } from './../emails/emails.service';
export declare class OrdersService {
    private readonly manager;
    private readonly orderRepository;
    private readonly opRepository;
    private readonly productService;
    private readonly userService;
    private readonly emailService;
    constructor(manager: EntityManager, orderRepository: Repository<OrderEntity>, opRepository: Repository<OrdersProductsEntity>, productService: ProductsService, userService: UsersService, emailService: EmailsService);
    create(createOrderDto: CreateOrderDto, currentUser: UserEntity): Promise<OrderEntity | null>;
    findAll(limit?: number, offset?: number, status?: 'processing' | 'shipped' | 'delivered' | 'cancelled', userId?: number): Promise<OrderEntity[]>;
    findOne(id: number): Promise<OrderEntity>;
    findOneByProductId(id: number): Promise<OrdersProductsEntity | null>;
    update(id: number, updateOrderStatusDto: UpdateOrderStatusDto, currentUser: UserEntity): Promise<OrderEntity>;
    cancelled(id: number, currentUser: UserEntity): Promise<OrderEntity>;
    remove(id: number): Promise<{
        message: string;
    }>;
    stockUpdate(order: OrderEntity, status: string): Promise<void>;
    getOrCreateUserCart(userId: number): Promise<OrderEntity>;
    addProductToCart(orderedProductsDto: OrderedProductsDto, currentUser: UserEntity): Promise<{
        totalPrice: number;
        products: {
            id: number;
            product_unit_price: number;
            product_quantity: number;
            product: ProductEntity;
        }[];
        id: number;
        orderAt: Timestamp;
        status: string;
        shippedAt: Date;
        deliveredAt: Date;
        updatedBy: UserEntity;
        shippingAddress?: ShippingEntity;
        user: UserEntity;
    }>;
    removeProductFromCart(productId: number, user: UserEntity): Promise<{
        message: string;
    }>;
    checkout(createShippingDto: CreateShippingDto, currentUser: UserEntity): Promise<{
        products: {
            id: number;
            product_unit_price: number;
            product_quantity: number;
            product: ProductEntity;
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
        orderAt: Timestamp;
        status: string;
        shippedAt: Date;
        deliveredAt: Date;
        updatedBy: UserEntity;
        user: UserEntity;
    }>;
}

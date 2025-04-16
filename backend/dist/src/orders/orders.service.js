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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const typeorm_2 = require("typeorm");
const orders_products_entity_1 = require("./entities/orders-products.entity");
const shipping_entity_1 = require("./entities/shipping.entity");
const products_service_1 = require("./../products/products.service");
const order_status_enum_1 = require("./enum/order-status.enum");
const users_service_1 = require("./../users/users.service");
const emails_service_1 = require("./../emails/emails.service");
let OrdersService = class OrdersService {
    manager;
    orderRepository;
    opRepository;
    productService;
    userService;
    emailService;
    constructor(manager, orderRepository, opRepository, productService, userService, emailService) {
        this.manager = manager;
        this.orderRepository = orderRepository;
        this.opRepository = opRepository;
        this.productService = productService;
        this.userService = userService;
        this.emailService = emailService;
    }
    async create(createOrderDto, currentUser) {
        return this.manager.transaction(async (transactionalEntityManager) => {
            const shippingEntity = new shipping_entity_1.ShippingEntity();
            Object.assign(shippingEntity, createOrderDto.shippingAddress);
            const orderEntity = new order_entity_1.OrderEntity();
            orderEntity.shippingAddress =
                shippingEntity;
            orderEntity.user = currentUser;
            const orderTbl = await transactionalEntityManager.save(orderEntity);
            const opEntities = [];
            for (const productDto of createOrderDto.products) {
                const product = await this.productService.findOne(productDto.id);
                if (product.stock <
                    productDto.product_quantity) {
                    throw new common_1.BadRequestException(`Product ${product.id} is out of stock.`);
                }
                opEntities.push({
                    order: orderTbl,
                    product: product,
                    product_quantity: productDto.product_quantity,
                    product_unit_price: product.price,
                });
            }
            await transactionalEntityManager.save(orders_products_entity_1.OrdersProductsEntity, opEntities);
            const fullOrder = await transactionalEntityManager.findOne(order_entity_1.OrderEntity, {
                where: { id: orderTbl.id },
                relations: [
                    'shippingAddress',
                    'user',
                    'products',
                    'products.product',
                ],
            });
            return fullOrder;
        });
    }
    async findAll(limit = 10, offset = 0, status, userId) {
        const whereClause = {};
        if (status)
            whereClause.status = status;
        if (userId)
            whereClause.user = { id: userId };
        const orders = await this.orderRepository.find({
            take: limit,
            skip: offset,
            where: whereClause,
            relations: {
                shippingAddress: true,
                user: true,
                products: {
                    product: true,
                },
            },
        });
        if (!orders || orders.length === 0) {
            throw new common_1.NotFoundException('No orders found.');
        }
        return orders;
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id: id },
            relations: {
                shippingAddress: true,
                user: true,
                products: {
                    product: true,
                },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found.');
        return order;
    }
    async findOneByProductId(id) {
        return await this.opRepository.findOne({
            relations: {
                product: true,
            },
            where: { product: { id: id } },
        });
    }
    async update(id, updateOrderStatusDto, currentUser) {
        let order = await this.findOne(id);
        if (updateOrderStatusDto.status === order.status) {
            return order;
        }
        const allowedTransitions = {
            [order_status_enum_1.OrderStatus.CART]: [
                order_status_enum_1.OrderStatus.PROCESSING,
            ],
            [order_status_enum_1.OrderStatus.PROCESSING]: [
                order_status_enum_1.OrderStatus.SHIPPED,
                order_status_enum_1.OrderStatus.CANCELLED,
            ],
            [order_status_enum_1.OrderStatus.SHIPPED]: [
                order_status_enum_1.OrderStatus.DELIVERED,
            ],
        };
        if (!allowedTransitions[order.status]?.includes(updateOrderStatusDto.status)) {
            throw new common_1.BadRequestException(`Invalid status transition: ${order.status} → ${updateOrderStatusDto.status}`);
        }
        if (updateOrderStatusDto.status ===
            order_status_enum_1.OrderStatus.SHIPPED) {
            order.shippedAt = new Date();
        }
        else if (updateOrderStatusDto.status ===
            order_status_enum_1.OrderStatus.DELIVERED) {
            order.deliveredAt = new Date();
        }
        order.status = updateOrderStatusDto.status;
        order.updatedBy = currentUser;
        order =
            await this.orderRepository.save(order);
        if (updateOrderStatusDto.status ===
            order_status_enum_1.OrderStatus.DELIVERED) {
            await this.stockUpdate(order, order_status_enum_1.OrderStatus.DELIVERED);
        }
        const newStatus = updateOrderStatusDto.status;
        const userEmail = order.user.email;
        if (newStatus === order_status_enum_1.OrderStatus.PROCESSING) {
            await this.emailService.sendOrderStatusEmail(userEmail, order.id, 'processing');
        }
        else if (newStatus === order_status_enum_1.OrderStatus.SHIPPED) {
            await this.emailService.sendOrderStatusEmail(userEmail, order.id, 'shipped');
        }
        else if (newStatus === order_status_enum_1.OrderStatus.DELIVERED) {
            await this.emailService.sendOrderStatusEmail(userEmail, order.id, 'delivered');
        }
        return order;
    }
    async cancelled(id, currentUser) {
        let order = await this.findOne(id);
        if (order.status === order_status_enum_1.OrderStatus.CANCELLED)
            return order;
        order.status = order_status_enum_1.OrderStatus.CANCELLED;
        order.updatedBy = currentUser;
        order =
            await this.orderRepository.save(order);
        await this.stockUpdate(order, order_status_enum_1.OrderStatus.CANCELLED);
        await this.emailService.sendOrderStatusEmail(order.user.email, order.id, 'cancelled');
        return order;
    }
    async remove(id) {
        const order = await this.findOne(id);
        if (order.status !== order_status_enum_1.OrderStatus.PROCESSING) {
            throw new common_1.BadRequestException('Cannot delete non-pending orders.');
        }
        await this.orderRepository.delete(id);
        return {
            message: 'Order deleted successfully.',
        };
    }
    async stockUpdate(order, status) {
        for (const op of order.products) {
            await this.productService.updateStock(op.product.id, op.product_quantity, status);
        }
    }
    async getOrCreateUserCart(userId) {
        let cart = await this.orderRepository.findOne({
            where: {
                user: { id: userId },
                status: order_status_enum_1.OrderStatus.CART,
            },
            relations: [
                'products',
                'products.product',
            ],
        });
        if (!cart) {
            cart = new order_entity_1.OrderEntity();
            cart.user = {
                id: userId,
            };
            cart.status = order_status_enum_1.OrderStatus.CART;
            cart =
                await this.orderRepository.save(cart);
        }
        cart = await this.orderRepository.findOne({
            where: { id: cart.id },
            relations: ['products', 'products.product'],
        });
        if (!cart)
            throw new common_1.NotFoundException(`Cart for user ${userId} could not be created.`);
        return cart;
    }
    async addProductToCart(orderedProductsDto, currentUser) {
        const product = await this.productService.findOne(orderedProductsDto.id);
        const cart = await this.getOrCreateUserCart(currentUser.id);
        if (product.stock <
            orderedProductsDto.product_quantity) {
            throw new common_1.BadRequestException(`Product ${product.id} is out of stock.`);
        }
        let existingProduct = cart.products.find((p) => p.product.id === orderedProductsDto.id);
        if (existingProduct) {
            existingProduct.product_quantity =
                orderedProductsDto.product_quantity;
            await this.opRepository.save(existingProduct);
        }
        else {
            const orderedProduct = new orders_products_entity_1.OrdersProductsEntity();
            orderedProduct.order = cart;
            orderedProduct.product = product;
            orderedProduct.product_quantity =
                orderedProductsDto.product_quantity;
            orderedProduct.product_unit_price =
                product.price;
            const savedProduct = await this.opRepository.save(orderedProduct);
            cart.products.push(savedProduct);
        }
        const totalPrice = cart.products.reduce((sum, product) => {
            return (sum +
                product.product_unit_price *
                    product.product_quantity);
        }, 0);
        const savedCart = await this.orderRepository.save(cart);
        return {
            ...savedCart,
            totalPrice,
            products: savedCart.products.map(({ order, ...rest }) => rest),
        };
    }
    async removeProductFromCart(productId, user) {
        const cart = await this.getOrCreateUserCart(user.id);
        const orderedProduct = cart.products.find((p) => p.product.id === productId);
        if (!orderedProduct) {
            throw new common_1.NotFoundException('Product not found in cart');
        }
        await this.opRepository.remove(orderedProduct);
        return {
            message: 'Product removed from cart',
        };
    }
    async checkout(createShippingDto, currentUser) {
        const cart = await this.getOrCreateUserCart(currentUser.id);
        if (cart.products.length === 0) {
            throw new common_1.BadRequestException('Cart is empty.');
        }
        cart.status = order_status_enum_1.OrderStatus.PROCESSING;
        const shipping = new shipping_entity_1.ShippingEntity();
        shipping.order = cart;
        shipping.name = createShippingDto.name;
        shipping.phone = createShippingDto.phone;
        shipping.address = createShippingDto.address;
        shipping.postalCode =
            createShippingDto.postalCode;
        shipping.city = createShippingDto.city;
        shipping.state = createShippingDto.state;
        shipping.country = createShippingDto.country;
        cart.shippingAddress = shipping;
        const savedCart = await this.orderRepository.save(cart);
        await this.emailService.sendOrderStatusEmail(currentUser.email, cart.id, 'processing');
        return {
            ...savedCart,
            products: savedCart.products.map(({ order, ...rest }) => rest),
            shippingAddress: savedCart.shippingAddress
                ? {
                    ...savedCart.shippingAddress,
                    order: undefined,
                }
                : null,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(orders_products_entity_1.OrdersProductsEntity)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => products_service_1.ProductsService))),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        typeorm_2.Repository,
        typeorm_2.Repository,
        products_service_1.ProductsService,
        users_service_1.UsersService,
        emails_service_1.EmailsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
import { OrderEntity } from './order.entity';
import { ProductEntity } from './../../products/entities/product.entity';
export declare class OrdersProductsEntity {
    id: number;
    product_unit_price: number;
    product_quantity: number;
    order: OrderEntity;
    product: ProductEntity;
}

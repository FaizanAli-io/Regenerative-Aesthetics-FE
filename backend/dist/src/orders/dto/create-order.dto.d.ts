import { CreateShippingDto } from './create-shipping.dto';
import { OrderedProductsDto } from './ordered-products.dto';
export declare class CreateOrderDto {
    shippingAddress: CreateShippingDto;
    products: OrderedProductsDto[];
}

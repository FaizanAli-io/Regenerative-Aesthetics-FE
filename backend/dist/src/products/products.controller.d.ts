import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserEntity } from './../users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductsDto } from './dto/products.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, currentUser: UserEntity): Promise<ProductEntity>;
    findAll(query: any): Promise<ProductsDto>;
    findOne(id: string): Promise<ProductEntity>;
    update(id: string, updateProductDto: UpdateProductDto, currentUser: UserEntity): Promise<ProductEntity>;
    remove(id: string): Promise<ProductEntity>;
}

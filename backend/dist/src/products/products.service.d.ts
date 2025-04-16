import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserEntity } from './../users/entities/user.entity';
import { OrdersService } from './../orders/orders.service';
import { CategoriesService } from './../categories/categories.service';
export declare class ProductsService {
    private readonly productRepository;
    private readonly categoryService;
    private readonly orderService;
    constructor(productRepository: Repository<ProductEntity>, categoryService: CategoriesService, orderService: OrdersService);
    create(createProductDto: CreateProductDto, currentUser: UserEntity): Promise<ProductEntity>;
    findAll(query: any): Promise<{
        products: any;
        totalProducts: number;
        limit: number;
    }>;
    findOne(id: number): Promise<ProductEntity>;
    update(id: number, fields: Partial<UpdateProductDto>, currentUser: UserEntity): Promise<ProductEntity>;
    remove(id: number): Promise<ProductEntity>;
    updateStock(id: number, stock: number, status: string): Promise<ProductEntity>;
}

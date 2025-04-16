import { ProductEntity } from './../../products/entities/product.entity';
import { UserEntity } from './../../users/entities/user.entity';
import { Timestamp } from 'typeorm';
export declare class CategoryEntity {
    id: number;
    title: string;
    description: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    addedBy: UserEntity;
    products: ProductEntity[];
    parentCategory: CategoryEntity | null;
    children: CategoryEntity[];
}

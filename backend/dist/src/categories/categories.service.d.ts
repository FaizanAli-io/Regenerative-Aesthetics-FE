import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './../users/entities/user.entity';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    create(createCategoryDto: CreateCategoryDto, currentUser: UserEntity): Promise<CategoryEntity>;
    findAll(): Promise<CategoryEntity[]>;
    private buildCategoryTree;
    getCategoryAndChildrenIds(categoryId: number): Promise<number[]>;
    findOne(id: number): Promise<CategoryEntity>;
    update(id: number, fields: Partial<UpdateCategoryDto>): Promise<CategoryEntity>;
    remove(id: number): Promise<DeleteResult>;
}

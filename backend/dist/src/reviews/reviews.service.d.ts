import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from './../users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductsService } from './../products/products.service';
export declare class ReviewsService {
    private readonly reviewRepository;
    private readonly productService;
    constructor(reviewRepository: Repository<ReviewEntity>, productService: ProductsService);
    create(createReviewDto: CreateReviewDto, currentUser: UserEntity): Promise<ReviewEntity>;
    findAll(): Promise<ReviewEntity[]>;
    findAllByProduct(id: number): Promise<ReviewEntity[]>;
    findOne(id: number): Promise<ReviewEntity>;
    update(id: number, updateReviewDto: UpdateReviewDto, currentUser: UserEntity): Promise<ReviewEntity>;
    remove(id: number): Promise<ReviewEntity>;
    findOneByUserAndProduct(userId: number, productId: number): Promise<ReviewEntity | null>;
}
